module.exports = {
         content: [
              "./templates//*.twig",
              "./assets//.js",
              "./assets/**/*.js",
              "./templates/**/*.html.twig",
              "./assets/**/.vue",
          //     "./templates/bundles/**/*.html.twig",  
              // Ajoutez d'autres chemins selon vos fichiers
         ],
     // content: [
     //      "./templates/*.twig",
     //      "./assets/*.js",
     //      "./assets/**/*.js",
     //      "./templates/**/*.html.twig",
     //      "./assets/**/*.vue",     // Fixed the .vue extension
     //      "./templates/bundles/**/*.html.twig",  // Make sure this line is present
     //      // Ajoutez d'autres chemins selon vos fichiers
     // ],
     theme: {
          extend: {
               fontFamily: {
                    inter: ['Inter', 'sans-serif'],
                    roboto: ['Roboto', 'sans-serif'],
                    montserrat: ['Montserrat', 'sans-serif'],
                    lato: ['Lato', 'sans-serif'],
                    poppins: ['Poppins', 'sans-serif'],
                    nunito: ['Nunito', 'sans-serif'],
                    oxygen: ['Oxygen', 'sans-serif'],
                    raleway: ['Raleway', 'sans-serif'],
                    sourceSans: ['Source Sans Pro', 'sans-serif'],
                    quicksand: ['Quicksand', 'sans-serif'],
               },
          }
     },
     plugins: [],
};