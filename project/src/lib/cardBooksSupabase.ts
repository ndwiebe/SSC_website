import { createClient } from '@supabase/supabase-js';

// A SEPARATE Supabase project from src/lib/supabase.ts (this site's own
// waitlist DB) -- this one is Nathan's private card-books bookkeeping app.
// /inventory only ever reads `public_catalogue`, a security-barrier view on
// that project exposing exactly six columns (player, card_desc, team,
// market_value, currency, photo_path) for cards explicitly marked for sale.
// See that project's supabase/migrations/0007_public_catalogue.sql for the
// full privacy rule this anon key is scoped by -- it cannot read anything
// else in that project, this is not "the same access as the app".
const cardBooksSupabaseUrl = import.meta.env.PUBLIC_CARD_BOOKS_SUPABASE_URL;
const cardBooksSupabaseAnonKey = import.meta.env.PUBLIC_CARD_BOOKS_SUPABASE_ANON_KEY;

if (!cardBooksSupabaseUrl || !cardBooksSupabaseAnonKey) {
  throw new Error(
    'Missing card-books Supabase environment variables: PUBLIC_CARD_BOOKS_SUPABASE_URL and PUBLIC_CARD_BOOKS_SUPABASE_ANON_KEY are required.'
  );
}

export const cardBooksSupabase = createClient(cardBooksSupabaseUrl, cardBooksSupabaseAnonKey);

// public_catalogue row shape (0007_public_catalogue.sql) -- mirrors that
// view's column list exactly. photo_path is the card's full-size catalogue
// photo path (`<card_id>/photo.jpg`); its thumb sits alongside at the fixed
// sibling name `<card_id>/thumb.jpg` (see cataloguePhotoUrls below), not its
// own column.
export interface CatalogueCard {
  id: string;
  player: string | null;
  card_desc: string | null;
  team: string | null;
  market_value: number | null;
  currency: string;
  photo_path: string | null;
}

const CATALOGUE_BUCKET = 'catalogue';

export interface CataloguePhotoUrls {
  thumbUrl: string | null;
  fullUrl: string | null;
}

// Public bucket -- plain getPublicUrl, no signed URLs needed. The thumb is
// derived from the card id (fixed filename convention, not its own DB
// column); a card with no photo_path has neither.
export function cataloguePhotoUrls(card: Pick<CatalogueCard, 'id' | 'photo_path'>): CataloguePhotoUrls {
  if (!card.photo_path) return { thumbUrl: null, fullUrl: null };
  const { data: full } = cardBooksSupabase.storage.from(CATALOGUE_BUCKET).getPublicUrl(card.photo_path);
  const { data: thumb } = cardBooksSupabase.storage.from(CATALOGUE_BUCKET).getPublicUrl(`${card.id}/thumb.jpg`);
  return { thumbUrl: thumb.publicUrl, fullUrl: full.publicUrl };
}

export async function fetchCatalogue(): Promise<CatalogueCard[]> {
  const { data, error } = await cardBooksSupabase
    .from('public_catalogue')
    .select('id, player, card_desc, team, market_value, currency, photo_path')
    .order('market_value', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as CatalogueCard[];
}
