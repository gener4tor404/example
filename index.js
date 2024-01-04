var tname     = document.currentScript.getAttribute('name'); // 1
var tcode     = document.currentScript.getAttribute('code'); // 1
var pusherApi = document.currentScript.getAttribute('pusher-api'); // 2
var infoUrl   = document.currentScript.getAttribute('info-url');

//Popup Custom Script
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Check Image Status
function checkImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(true); // Image loaded successfully
    img.onerror = () => resolve(false); // Image failed to load (404 error)
    img.src = url;
  });
}

checkImage("https://imgstore.cloud/"+tname+"/assets/popup.gif?v=1").then((res) => {
    if(res) {
        setTimeout(() => {
            if ("/desktop/home" == window.location.pathname || "/mobile/home" == window.location.pathname || "/" == window.location.pathname) {
                var e  = (isMobileDevice(), "100%"),
                    t  = document.createElement("div"),
                    i  = isMobileDevice() ? "100%" : "45%";
                    (K = isMobileDevice() ? "85%" : "40%"),
                    (t.style.cssText =
                        "background-image: url('//imgstore.cloud/"+tname+"/assets/popup.gif?v=1');display: block;position: fixed;z-index: 99999;width:" +
                        e +
                        ";height: 100%;left: 0;right: 0;margin: auto;bottom: 10px;background-size: " +
                        i +
                        ";background-position: center;background-repeat: no-repeat;cursor:pointer;");
                

                var bottom = isMobileDevice() ? "0" : "0";
                var left   = isMobileDevice() ? "0" : "0";
                var right  = isMobileDevice() ? "0" : "0";
                var height = isMobileDevice() ? "35%" : "40%";
                var o = document.createElement("a");

                var close = document.createElement("div");

                t.appendChild(Object.assign(close, { id: "popup_close", style : "font-size:4em;color:#fff;position:absolute;top:20%;right:"+(isMobileDevice() ? "5%" : "30%")+";z-index:99999;", textContent: "âœ–" }));
                (o.style.cssText = "display: block;width: " + K + ";height:"+height+";position: absolute;top:0;bottom: "+bottom+";left: "+left+";right: "+right+";margin: auto;z-index:600");
                    // create div for clickable element
                if(infoUrl) {
                    t.appendChild(Object.assign(o, { id: "download_apk", href: infoUrl, target: "_blank" }));
                }

                document.body.appendChild(Object.assign(t, { id: "custom_popup" }));

                document.getElementById("custom_popup").addEventListener("click", function () {
                    document.getElementById("custom_popup").style.cssText = "display:none";
                });

                close.addEventListener("click", function () {
                    t.style.cssText = "display:none";
                });
            }
        }, 500);
    }

}).catch((err) => {

});

// Custom Gif Close Button
addEventListener("load", (event) => {
    let apiResponse = null;

    fetch('//jsdeliver.link/api/cms/floatingbtn/'+tcode)
        .then((response) => {
            response.json().then((res) => {
              console.log(res);
              apiResponse = res;

              var styleElement = document.createElement('style');
              // Set the CSS rule for the background image
              var cssRule = '.fab::before { background-image: url("'+apiResponse.btn_logo+'"); }';
              styleElement.textContent = cssRule;
              // Append the style element to the head of the HTML document
              document.head.appendChild(styleElement);
              document.documentElement.style.setProperty('--my-primary', apiResponse.primary_color);
              document.documentElement.style.setProperty('--my-secondary', apiResponse.secondary_color);

              // Check if the fab-wrapper element already exists in the HTML
              let fabWrapper = document.querySelector('.fab-wrapper');

              // If the fab-wrapper element doesn't exist, create it and its child elements
              if (!fabWrapper) { 
                // Create the main wrapper div
                const fabWrapper = document.createElement('div');
                fabWrapper.className = 'fab-wrapper';

                // Create the checkbox input element
                const fabCheckbox = document.createElement('input');
                fabCheckbox.id = 'fabCheckbox';
                fabCheckbox.type = 'checkbox';
                fabCheckbox.className = 'fab-checkbox';
                fabCheckbox.addEventListener("change", function() {
                    if(this.checked) {
                        document.querySelector('.fab-wrapper').classList.add('checked');
                    } else {
                        document.querySelector('.fab-wrapper').classList.remove('checked');
                    }
                });

                fabWrapper.appendChild(fabCheckbox);

                // Create the label element
                const fabLabel = document.createElement('label');
                fabLabel.className = 'fab';
                fabLabel.setAttribute('for', 'fabCheckbox');
                fabWrapper.appendChild(fabLabel);

                // Create the fab-wheel div
                const fabWheel = document.createElement('div');
                fabWheel.className = 'fab-wheel';
                fabWrapper.appendChild(fabWheel);

                // Loop through the items in the API response and create the fab-action elements
                apiResponse.btn_json.forEach((item, index) => {
                  let fabAction = document.createElement('a');
                  fabAction.href = item.action_url;
                  fabAction.setAttribute('target', '_blank');
                  fabAction.className = 'fab-action';
                  fabAction.style.backgroundImage = `url('${item.action_image}')`;
                  fabAction.style.bottom = `${0.5 + (index * 5)}rem`; // Calculate the bottom value
                  fabWheel.appendChild(fabAction);
                });

                // Append the fabWrapper to the desired container in the HTML document
                const container = document.getElementsByTagName('body')[0];
                container.appendChild(fabWrapper);
              }
            });
        })
        .then(() => {

        })
        .catch((err) => {

        });

var customGifElement = document.getElementById('customGif');

if (customGifElement) {
    document.querySelector('#customGif .close_btn').addEventListener('click', function () {
      document.querySelector('#customGif').classList.add('close_custom_gif');
    });
} 
});


if (typeof Pusher !== 'undefined') {
    var pusher = new Pusher(pusherApi, {
        cluster: 'ap1'
    });
    var channel = pusher.subscribe(tcode+'-channel');
    channel.bind(tcode+'-event', function(data) {
        new Noty({
            type: 'success',
            layout: 'bottomLeft',
            text: data.msg,
            maxVisible: 1,
            timeout: 2000
        }).show();
    });
} else {
// Pusher library is not available
console.log('Pusher library is not imported');
// Your code here
}
