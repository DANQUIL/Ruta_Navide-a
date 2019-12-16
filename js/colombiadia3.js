require([
    "esri/Map",
    "esri/Basemap",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/renderers/UniqueValueRenderer",
    "esri/WebMap",
    "esri/layers/VectorTileLayer"
], function(Map, Basemap, SceneView, FeatureLayer, Graphic, GraphicsLayer, UniqueValueRenderer, WebMap, VectorTileLayer) {

    //**Se configura las variables de visualizacion */
    var webmap = new WebMap({
        portalItem: {
            id: "37a6af565fa249e9a872a7bd37b3e047"
        }
    });

    var view = new SceneView({
        container: "viewDiv",
        map: webmap,
    });


    //**Se configurar las capas a visualizar */
    var polLayer = new FeatureLayer({
        url: "https://services.arcgis.com/8DAUcrpQcpyLMznu/ArcGIS/rest/services/Mapa_cartas_de_navidad_2019_Colombia_WFL1/FeatureServer/4",
        opacity: 0.4
    });

    webmap.add(polLayer);

    var trailsRenderer = {
        type: "simple",
        symbol: {
            type: "line-3d",
            symbolLayers: [{
                type: "path",
                profile: "quad",
                material: {
                    color: [0, 0, 255]
                },
                width: 30, // the width in m
                height: 5, // the height in m
                profileRotation: "heading"
            }]
        }
    };
    var lineColNyLayer = new FeatureLayer({
        url: "https://services.arcgis.com/8DAUcrpQcpyLMznu/ArcGIS/rest/services/Mapa_cartas_de_navidad_2019_Colombia_WFL1/FeatureServer/3",
        // elevationInfo: {
        //   mode: "relative-to-ground",
        //   offset: 10
        // },
        // renderer: trailsRenderer,
        // opacity: .75
        // opacity: 0.4
    });

    webmap.add(lineColNyLayer);

    var lineNyLnLayer = new FeatureLayer({
        url: "https://services.arcgis.com/8DAUcrpQcpyLMznu/ArcGIS/rest/services/Mapa_cartas_de_navidad_2019_Colombia_WFL1/FeatureServer/1",
        // elevationInfo: {
        //   mode: "relative-to-ground",
        //   offset: 10
        // },
        // renderer: trailsRenderer,
        // opacity: .75
        // opacity: 0.4
    });

    webmap.add(lineNyLnLayer);

    var lineLnGoLayer = new FeatureLayer({
        url: "https://services.arcgis.com/8DAUcrpQcpyLMznu/ArcGIS/rest/services/Mapa_cartas_de_navidad_2019_Colombia_WFL1/FeatureServer/2",
        // elevationInfo: {
        //   mode: "relative-to-ground",
        //   offset: 10
        // },
        // renderer: trailsRenderer,
        // opacity: .75
        // opacity: 0.4
    });

    webmap.add(lineLnGoLayer);


    var graphicsLayer = new GraphicsLayer({
        // elevationInfo: {
        //   mode: "relative-to-ground",
        //   offset: 10
        // }
    });

    // map.add(graphicsLayer);

    var simpleLineSymbol = {
        type: "simple-line",
        color: [0, 0, 255], // blue
        width: 5
    };

    const stripSymbol = {
        type: "line-3d",
        symbolLayers: [{
            type: "path",
            profile: "quad",
            material: {
                color: [100, 100, 100]
            },
            width: 30, // the width in m
            height: 5, // the height in m
            profileRotation: "heading"
        }]
    }

    var polyline = {
        type: "polyline",
        paths: [
            [-74.090923, 4.694939],
            [-73.9385, 40.6643],
            [-0.12574, 51.5085297],
            [-42.6043015, 71.7069397]
        ]
    };

    var polylineGraphic = new Graphic({
        geometry: polyline,
        symbol: simpleLineSymbol
            // symbol: stripSymbol
    })

    // graphicsLayer.add(polylineGraphic);

    /**Se configura la animación de desplazamiento 
     * de la camara
     */

    const opts = {
        duration: 12000 // Duration of animation will be 5 seconds
    };

    // Función Modal

    function Modal() {
        console.log("aq");
        
        // Variables
        var panel     = document.getElementById("js-panel");
        var btns      = document.querySelectorAll(".flap__btn");
        
        // On load, init panel
        var init = function() {
          panel.classList.add("is--open");
          
          // If btns are clicked, hide panel
          // Show replay button    
          for (var i=0; i < btns.length; i++) {
            btns[i].addEventListener("click", function() {
              hidePanel();
            });
          }
          
          function hidePanel() {
            panel.classList.remove("is--open");
          }
          
          // When replay button is clicked,
          // reset the stage.
          
        }
        
        // Hide the button and re-call init
        
        
        // On load, call init function
        
          init();
        
      }

      // End Modal


    view.when(function() {

        view.goTo({
                center: [-74.090923, 4.694939],
                zoom: 6,
                tilt: 40
            }, { duration: 10000 })
            .then(() => {
                return view.goTo({
                    center: [-73.9385, 40.6643],
                    zoom: 7,
                    tilt: 40
                }, opts)
            })
            .then(() => {
                return view.goTo({
                    center: [-0.12574, 51.5085297],
                    zoom: 6,
                    tilt: 40
                }, opts)
            })
            .then(() => {
                return view.goTo({
                    center: [-42.6043015, 71.7069397],
                    zoom: 6,
                    tilt: 40
                }, opts)
            })
            .then(() => {
                console.log("empezo");
                Modal()
           })
           .catch(() => {
               console.log("Estoy en catch")
               Modal()

           })

    })

})