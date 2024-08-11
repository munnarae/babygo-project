module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                '.no-scrollbar': {
                    /* Hide scrollbar for Chrome, Safari, Edge */
                    '-ms-overflow-style': 'none' /* IE and Edge */,
                    'scrollbar-width': 'none' /* Firefox */,
                    '&::-webkit-scrollbar': {
                        display: 'none' /* Chrome, Safari, and Opera */,
                    },
                },
            };
            addUtilities(newUtilities, ['responsive']);
        },
    ],
};