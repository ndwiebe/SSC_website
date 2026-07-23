import React, { useEffect, useState } from 'react';
import { ImageOff, Loader2, MessageCircle, X } from 'lucide-react';
import { captureEvent } from '../lib/posthog';
import {
  cataloguePhotoUrls,
  fetchCatalogue,
  type CatalogueCard,
} from '../lib/cardBooksSupabase';

// Nathan's Facebook page (also linked from Footer.astro / BaseLayout's
// sameAs) -- the "message me to buy" path this whole page funnels toward.
const FACEBOOK_URL = 'https://facebook.com/slabsavvy';

function formatPrice(value: number | null, currency: string): string {
  if (value === null) return '';
  try {
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency }).format(value);
  } catch {
    return `$${value.toFixed(2)} ${currency}`;
  }
}

// Thumb -> full image -> quiet placeholder. A card can be listed with no
// photo attached at all (photo_path null), or its thumb copy specifically
// can be missing (source photo predates thumbnails) -- either way this
// never shows a broken image, only ever the placeholder.
function CatalogueImage({
  thumbUrl,
  fullUrl,
  alt,
  onOpen,
}: {
  thumbUrl: string | null;
  fullUrl: string | null;
  alt: string;
  onOpen: () => void;
}) {
  // Show the full-size photo in the grid: these are showcase sales cards, not
  // the app's dense 44px ledger rows, so the tiny 160px thumb looked blurry
  // scaled up to card size. Fall back to the thumb only if the full object is
  // missing (e.g. a photo predating the catalogue copy).
  const [src, setSrc] = useState(fullUrl ?? thumbUrl);
  const [failed, setFailed] = useState(!src);

  function handleError() {
    if (src === fullUrl && thumbUrl && thumbUrl !== fullUrl) {
      setSrc(thumbUrl);
      return;
    }
    setFailed(true);
  }

  if (!src || failed) {
    return (
      <div className="aspect-[5/7] w-full bg-ssc-surface-dark flex items-center justify-center">
        <ImageOff className="w-8 h-8 text-ssc-text-muted" aria-hidden />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      disabled={!fullUrl}
      className="block w-full aspect-[5/7] overflow-hidden bg-ssc-surface-dark disabled:cursor-default"
      aria-label={fullUrl ? `View full-size photo of ${alt}` : alt}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={handleError}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </button>
  );
}

export const InventoryGrid: React.FC = () => {
  const [cards, setCards] = useState<CatalogueCard[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ url: string; alt: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchCatalogue()
      .then((rows) => {
        if (!cancelled) setCards(rows);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function handleMessageClick(card: CatalogueCard) {
    captureEvent('inventory_message_click', { card_id: card.id });
  }

  if (error) {
    return (
      <div className="glass p-8 text-center">
        <p className="font-body text-ssc-text-muted">
          Could not load the current inventory right now. Please check back soon.
        </p>
      </div>
    );
  }

  if (cards === null) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-ssc-gold animate-spin" aria-hidden />
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="glass p-10 md:p-14 text-center">
        <h2 className="font-headline text-2xl md:text-3xl text-ssc-text tracking-wide mb-3">
          NOTHING LISTED RIGHT NOW
        </h2>
        <p className="font-body text-ssc-text-muted max-w-md mx-auto">Check back soon.</p>
      </div>
    );
  }

  return (
    <>
      {/* No data-animate scroll-reveal here (unlike the rest of this site's
          sections): BaseLayout's inline reveal script runs once at parse --
          before this React island (client:load) has hydrated and rendered these
          cards into the DOM. Its one-time querySelectorAll('[data-animate]')
          never finds elements that don't exist yet, so a hidden start here
          would never get revealed. */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {cards.map((card) => {
          const { thumbUrl, fullUrl } = cataloguePhotoUrls(card);
          const title = card.player || card.card_desc || 'Sports card';
          const subtitle = card.player ? card.card_desc : card.team;
          return (
            <div
              key={card.id}
              className="catalogue-card group relative border border-ssc-border/80 bg-white/90 backdrop-blur-sm card-hover flex flex-col"
            >
              <CatalogueImage
                thumbUrl={thumbUrl}
                fullUrl={fullUrl}
                alt={title}
                onOpen={() => fullUrl && setLightbox({ url: fullUrl, alt: title })}
              />
              <div className="p-3 flex flex-col gap-1.5 flex-1">
                <p className="font-body font-semibold text-ssc-text text-sm leading-tight truncate">{title}</p>
                {subtitle ? (
                  <p className="font-body text-xs text-ssc-text-muted truncate">{subtitle}</p>
                ) : null}
                <p className="font-mono text-lg text-ssc-gold mt-1">{formatPrice(card.market_value, card.currency)}</p>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleMessageClick(card)}
                  className="mt-2 inline-flex items-center justify-center gap-1.5 min-h-[40px] px-3 py-2 border border-ssc-gold text-ssc-gold font-body text-xs font-semibold hover:bg-ssc-gold hover:text-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden />
                  Message me to buy
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
        >
          <button
            type="button"
            aria-label="Close photo"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/30 bg-black/40 text-white"
          >
            <X className="w-5 h-5" aria-hidden />
          </button>
          <img
            src={lightbox.url}
            alt={lightbox.alt}
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
};
