import { MapPin, Navigation2, ExternalLink, Phone } from 'lucide-react';

export default function MapSection({ venue, accent, cardBg, btnGradient, btnText }) {
  return (
    <div className="space-y-5">
      {/* Venue card */}
      <div
        className="rounded-2xl p-6 flex gap-5"
        style={{ background: cardBg, border: `1px solid ${accent}25` }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: `${accent}15`, border: `1px solid ${accent}50` }}
        >
          <MapPin className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display font-semibold text-xl text-white mb-0.5">{venue.name}</div>
          <div className="font-body text-sm font-light mb-0.5" style={{ color: `${accent}cc` }}>
            {venue.hall}
          </div>
          <div className="font-body text-sm text-white/50 mb-4">{venue.address}</div>
          <div className="flex flex-wrap gap-3">
            <a
              href={venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs py-2 px-5 rounded-full font-body font-medium uppercase tracking-wider inline-flex items-center gap-2 transition-transform duration-200 hover:scale-105"
              style={{
                background: btnGradient || `linear-gradient(135deg, ${accent}, #fff)`,
                color: btnText || '#000',
                boxShadow: `0 4px 20px ${accent}35`,
              }}
            >
              <Navigation2 className="w-3.5 h-3.5" />
              Get Directions
            </a>
            <a
              href={venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs py-2 px-5 rounded-full font-body font-light uppercase tracking-wider inline-flex items-center gap-2 transition-all duration-200 hover:scale-105"
              style={{
                border: `1px solid ${accent}50`,
                color: accent,
                background: `${accent}0d`,
              }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open in Maps
            </a>
            {venue.phone && (
              <a
                href={`tel:${venue.phone}`}
                className="text-xs py-2 px-5 rounded-full font-body font-light uppercase tracking-wider inline-flex items-center gap-2 transition-all duration-200 hover:scale-105"
                style={{
                  border: `1px solid ${accent}50`,
                  color: accent,
                  background: `${accent}0d`,
                }}
              >
                <Phone className="w-3.5 h-3.5" />
                Call Venue
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Map embed */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ border: `1px solid ${accent}30`, boxShadow: `0 20px 60px rgba(0,0,0,0.4)` }}
      >
        {/* Corner decorations */}
        {['tl','tr','bl','br'].map(pos => (
          <div
            key={pos}
            className="absolute z-10 w-5 h-5"
            style={{
              top: pos.startsWith('t') ? '10px' : 'auto',
              bottom: pos.startsWith('b') ? '10px' : 'auto',
              left: pos.endsWith('l') ? '10px' : 'auto',
              right: pos.endsWith('r') ? '10px' : 'auto',
              borderTop: pos.startsWith('t') ? `1.5px solid ${accent}` : 'none',
              borderBottom: pos.startsWith('b') ? `1.5px solid ${accent}` : 'none',
              borderLeft: pos.endsWith('l') ? `1.5px solid ${accent}` : 'none',
              borderRight: pos.endsWith('r') ? `1.5px solid ${accent}` : 'none',
              borderRadius: pos === 'tl' ? '3px 0 0 0' : pos === 'tr' ? '0 3px 0 0' : pos === 'bl' ? '0 0 0 3px' : '0 0 3px 0',
            }}
          />
        ))}
        <iframe
          src={venue.embedUrl}
          width="100%"
          height="380"
          style={{ border: 0, display: 'block', filter: 'saturate(1.1)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Location of ${venue.name}`}
        />
      </div>
    </div>
  );
}
