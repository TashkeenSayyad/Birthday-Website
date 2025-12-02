import React from 'react';
import { ElegantHero, MinimalistHero, StorybookHero } from '../components/EnhancedHero';
import { LayeredCard, GlassCard, FloatingCard, HolographicCard } from '../components/EnhancedCards';
import { OrnateFrame, FloralCircleFrame, WhimsicalBorder } from '../components/ElegantFrames';
import { BirthdayPoster, GreetingCard, ArtPrintGallery } from '../components/ArtworkExport';
import { FloatingPetals, GeometricWaves } from '../components/AnimatedBackgrounds';
import '../styles/DesignShowcase.css';

const DesignShowcase = () => {
  return (
    <div className="design-showcase">
      {/* Animated background */}
      <FloatingPetals />

      <div className="showcase-content">
        {/* Hero Section Examples */}
        <section className="showcase-section">
          <h2 className="section-title">Enhanced Hero Sections</h2>

          <StorybookHero
            title="A Love Story"
            subtitle="Every moment with you is a treasure"
            chapter="Chapter Twenty-Four"
          />

          <div style={{ height: '60px' }}></div>

          <MinimalistHero
            title="Celebrate Life"
            subtitle="Another year of beautiful memories"
            accentText="Twenty-Four"
          />
        </section>

        {/* Card Designs */}
        <section className="showcase-section" style={{ position: 'relative', zIndex: 10 }}>
          <h2 className="section-title">3D Card Designs</h2>

          <div className="card-showcase-grid">
            <LayeredCard
              title="Memories"
              subtitle="Captured in time"
              icon="📸"
              color="#D5516B"
            >
              <p>Each photograph tells a story of laughter, love, and unforgettable moments shared together.</p>
            </LayeredCard>

            <GlassCard
              title="Wishes"
              icon="✨"
              accentColor="#9B72AA"
            >
              <p>May all your dreams come true as you step into this new year of your life.</p>
            </GlassCard>

            <HolographicCard
              title="Joy"
              subtitle="In every moment"
            >
              <p>Your smile lights up every room and brings happiness to everyone around you.</p>
            </HolographicCard>
          </div>
        </section>

        {/* Frame Examples */}
        <section className="showcase-section">
          <h2 className="section-title">Elegant Frames</h2>

          <div className="frame-showcase">
            <OrnateFrame
              width="600px"
              height="400px"
              borderColor="#9B72AA"
              accentColor="#D5516B"
            >
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#4A3642', marginBottom: '20px' }}>
                  Happy Birthday
                </h3>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#6B4E58', lineHeight: '1.8' }}>
                  May your special day be filled with love, laughter, and all the things that make you smile.
                  Here's to another year of wonderful adventures and beautiful memories!
                </p>
              </div>
            </OrnateFrame>

            <div style={{ height: '40px' }}></div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
              <FloralCircleFrame size={250} borderColor="#E8B4A0" accentColor="#D5516B">
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ fontFamily: 'Dancing Script, cursive', fontSize: '1.5rem', color: '#D5516B' }}>
                    With Love
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#8B4367', marginTop: '10px' }}>
                    Always & Forever
                  </p>
                </div>
              </FloralCircleFrame>

              <WhimsicalBorder
                primaryColor="#FFD1DC"
                secondaryColor="#C9A9E0"
              >
                <div style={{ padding: '40px', textAlign: 'center', minWidth: '300px' }}>
                  <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: '#4A3642', marginBottom: '15px' }}>
                    Celebrate
                  </h4>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', color: '#6B4E58', lineHeight: '1.6' }}>
                    Today is your day to shine bright and celebrate all that you are!
                  </p>
                </div>
              </WhimsicalBorder>
            </div>
          </div>
        </section>

        {/* Art Prints & Exports */}
        <section className="showcase-section">
          <h2 className="section-title">Downloadable Artwork</h2>

          <div className="artwork-showcase">
            <BirthdayPoster />

            <div style={{ height: '60px' }}></div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
              <GreetingCard message="Happy Birthday!" />
              <GreetingCard message="Make a Wish" />
            </div>

            <div style={{ height: '60px' }}></div>

            <ArtPrintGallery />
          </div>
        </section>

        {/* Design Philosophy */}
        <section className="showcase-section">
          <OrnateFrame width="800px" borderColor="#C9A9E0" accentColor="#E8B4A0">
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#4A3642', marginBottom: '25px' }}>
                Design Philosophy
              </h2>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#6B4E58', lineHeight: '2', marginBottom: '20px' }}>
                Every element in this design has been crafted with love and attention to detail.
                From the romantic color palette of rose gold, blush, and lavender to the elegant
                typography and flowing animations, each component works together to create a
                celebration of life, love, and beautiful memories.
              </p>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', color: '#8B4367', fontStyle: 'italic' }}>
                This is more than just a website—it's a digital love letter, a celebration,
                and a keepsake of precious moments.
              </p>
            </div>
          </OrnateFrame>
        </section>

        {/* Color Palette */}
        <section className="showcase-section">
          <h2 className="section-title">Color Palette</h2>
          <div className="color-palette">
            <div className="color-swatch" style={{ background: '#E8B4A0' }}>
              <span className="color-name">Rose Gold</span>
              <span className="color-hex">#E8B4A0</span>
            </div>
            <div className="color-swatch" style={{ background: '#FFD1DC' }}>
              <span className="color-name">Blush</span>
              <span className="color-hex">#FFD1DC</span>
            </div>
            <div className="color-swatch" style={{ background: '#C9A9E0' }}>
              <span className="color-name">Lavender</span>
              <span className="color-hex">#C9A9E0</span>
            </div>
            <div className="color-swatch" style={{ background: '#9B72AA' }}>
              <span className="color-name">Mauve</span>
              <span className="color-hex">#9B72AA</span>
            </div>
            <div className="color-swatch" style={{ background: '#D5516B' }}>
              <span className="color-name">Deep Rose</span>
              <span className="color-hex">#D5516B</span>
            </div>
            <div className="color-swatch" style={{ background: '#FF9A8B' }}>
              <span className="color-name">Sunset</span>
              <span className="color-hex">#FF9A8B</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DesignShowcase;
