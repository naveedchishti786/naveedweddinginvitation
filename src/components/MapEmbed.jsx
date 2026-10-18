import { MapPin, Navigation2, ExternalLink, Phone } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function MapSection({ venue, accent, cardBg, btnGradient, btnText }) {
  const { isDark } = useTheme();
  const textColor = isDark ? '#ffffff' : '#1a1612';
  const addressColor = isDark ? 'rgba(255,255,255,0.65)' : '#524538';

  return (
    <div className="space-y-5">
      {/* Venue card */}
      <div
        className="rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-3.5 sm:gap-5 items-start"
        style={{
          background: cardBg,
          border: `1px solid ${accent}25`,
          boxShadow: isDark ? 'none' : '0 10px 30px rgba(0,0,0,0.05)',
        }}
      >
        <div
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: `${accent}15`, border: `1px solid ${accent}50` }}
        >
          <MapPin className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div className="flex-1 min-w-0 w-full">
          <div className="font-display font-semibold text-lg sm:text-xl mb-0.5" style={{ color: textColor }}>{venue.name}</div>
          <div className="font-body text-xs sm:text-sm font-light mb-0.5" style={{ color: isDark ? `${accent}cc` : '#8c680f' }}>
            {venue.hall}
          </div>
          <div className="font-body text-xs sm:text-sm mb-4" style={{ color: addressColor }}>{venue.address}</div>
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full">
            <a
              href={venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs py-2.5 px-4 sm:px-5 rounded-full font-body font-medium uppercase tracking-wider inline-flex items-center justify-center gap-2 flex-1 sm:flex-initial transition-transform duration-200 hover:scale-105 text-center min-w-[130px]"
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
              className="text-xs py-2.5 px-4 sm:px-5 rounded-full font-body font-light uppercase tracking-wider inline-flex items-center justify-center gap-2 flex-1 sm:flex-initial transition-all duration-200 hover:scale-105 text-center min-w-[120px]"
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
                className="text-xs py-2.5 px-4 sm:px-5 rounded-full font-body font-light uppercase tracking-wider inline-flex items-center justify-center gap-2 flex-1 sm:flex-initial transition-all duration-200 hover:scale-105 text-center min-w-[110px]"
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
          className="w-full h-[280px] sm:h-[380px]"
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
