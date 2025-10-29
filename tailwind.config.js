/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Romantic color palette matching our design system
        'rose-gold': '#E8B4A0',
        'blush': '#FFD1DC',
        'lavender': '#C9A9E0',
        'mauve': '#9B72AA',
        'deep-rose': '#D5516B',
        'sunset': '#FF9A8B',
        'peach': '#FFDAB9',
        'lilac': '#DDA0DD',
        'warm-cream': '#FFF8E7',
        'soft-pink': '#FFE4E1',
        // Text colors
        'text-primary': '#4A3642',
        'text-secondary': '#6B4E58',
        'text-accent': '#8B4367',
        'text-light': '#A67C89',
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Crimson Text', 'Georgia', 'serif'],
        'script': ['Dancing Script', 'cursive'],
        'handwritten': ['Caveat', 'cursive'],
        'fancy': ['Great Vibes', 'cursive'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(213, 81, 107, 0.12), 0 2px 8px rgba(155, 114, 170, 0.08)',
        'medium': '0 10px 40px rgba(213, 81, 107, 0.15), 0 4px 16px rgba(155, 114, 170, 0.12)',
        'large': '0 20px 60px rgba(213, 81, 107, 0.2), 0 8px 24px rgba(155, 114, 170, 0.15)',
        'glow': '0 0 30px rgba(255, 154, 139, 0.3), 0 0 60px rgba(201, 169, 224, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gentle-pulse': 'gentlePulse 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'heart-beat': 'heartBeat 2s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-out',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-down': 'fadeInDown 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        gentlePulse: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
          '50%': { opacity: '0.6', transform: 'scale(0.9) rotate(180deg)' },
        },
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-romantic': 'radial-gradient(ellipse at top left, rgba(255, 209, 220, 0.3) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(201, 169, 224, 0.3) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(255, 218, 185, 0.3) 0%, transparent 50%), linear-gradient(135deg, #FFF8F0 0%, #FFE9E9 20%, #F5E6F0 40%, #EDE5F5 60%, #E8E0F5 80%, #F0E8F5 100%)',
        'paper-texture': 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
      },
    },
  },
  plugins: [],
}
