/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            maxHeight: {
                '75': '75vh'
            },
            height: {
                '75vh': '75vh'
            }
        },
        
        keyframes: {
            "shimmer": {
                "100%": {
                    "transform": "translateX(100%)",
                },
            },
            "spin":{
                from: {
                    "transform": "rotate(0deg)"
                  },
                  to: {
                    "transform": "rotate(360deg)"
                  }
            }
        
        },
        animation:{
            shimmer:'shimmer 3s infinite',
            spin:'spin 2s infinite'
        }
    },
    plugins: [],
}