<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <!-- Change the colour #f8fafc to match the previous section colour -->
  <svg class="wave-top" viewBox="0 0 1439 147" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" v-if="route.path === '/'">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g transform="translate(-1.000000, -14.000000)" fill-rule="nonzero">
        <g class="wave" fill="#f8fafc">
          <path
              d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"
          ></path>
        </g>
        <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
          <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
            <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
            <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
            ></path>
            <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" opacity="0.200000003"></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
  <section class="container mx-auto text-center py-6 mb-12" v-if="route.path === '/'">
    <h2 class="w-full my-2 text-5xl font-bold leading-tight text-center text-white">
      You Build! We <span class="gradient-text">authenticate</span>.
    </h2>
    <div class="w-full mb-4">
      <div class="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
    </div>
    <h3 class="my-4 text-3xl leading-tight text-white">
      More time for the most important aspects of your app.
    </h3>
    <div class="mt-12">
      <router-link to="/register" class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
        Get Started
      </router-link>
    </div>
  </section>
  <!--Footer-->
  <footer class="bg-transparent" :class="{'gradient': route.path !== '/'}">
    <div class="container mx-auto px-8">
      <div class="w-full flex flex-col md:flex-row py-6">
        <div class="flex-shrink flex justify-center md:justify-left mb-6 text-black">
          <a class="text-primary-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
            <svg
                class="h-16 fill-current inline"
                viewBox="0 0 512 512"
                version="1.1"
                id="svg5"
                sodipodi:docname="logo.svg"
                inkscape:version="1.1.1 (3bf5ae0, 2021-09-20)"
                inkscape:export-filename="/home/james/Projects/Codeprints/Hackathons/Build with Linode Hackathon/logo.png"
                inkscape:export-xdpi="96"
                inkscape:export-ydpi="96"
                xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
                xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:svg="http://www.w3.org/2000/svg">
              <g
                  inkscape:label="Layer 1"
                  inkscape:groupmode="layer"
                  id="layer1"
                  style="display:inline">
                <rect
                    style="fill:#f9e80f;fill-opacity:1;stroke:none;stroke-width:4.7991;stop-color:#000000"
                    id="rect846"
                    width="512"
                    height="512"
                    x="0.55242717"
                    y="0"
                    ry="88.739182"
                    inkscape:export-filename="/home/james/Projects/Codeprints/Hackathons/Build with Linode Hackathon/logo.png"
                    inkscape:export-xdpi="96"
                    inkscape:export-ydpi="96" />
                <path
                    id="path90911"
                    style="display:inline;fill:#000000;fill-opacity:0.992887;stroke:#000000;stroke-width:1.90107;stroke-opacity:1;stop-color:#000000"
                    d="m 73.365234,509.63033 c 2.255457,0.40617 4.515756,0.80173 6.828125,1.03516 2.990398,0.30188 6.025062,0.45703 9.097657,0.45703 H 423.8125 c 3.07259,0 6.10921,-0.15515 9.09961,-0.45703 2.20704,-0.2228 4.36029,-0.60798 6.51562,-0.98828 V 371.70846 c 0,-22.50707 -18.11792,-40.62696 -40.625,-40.62696 h -284.8125 c -22.507068,0 -40.624996,18.11989 -40.624996,40.62696 z" />
                <g
                    id="g74656"
                    transform="translate(9.7684727,-29.606671)">
                  <rect
                      style="fill:#000000;fill-opacity:0.993197;stroke:none;stroke-opacity:1;stop-color:#000000"
                      id="rect71128"
                      width="118.07401"
                      height="201.53465"
                      x="96.81076"
                      y="176.79738"
                      ry="59.037006" />
                  <path
                      style="display:inline;fill:#f9e80f;fill-opacity:1;stroke:none;stroke-opacity:1;stop-color:#000000"
                      id="rect71128-5"
                      width="118.07401"
                      height="201.53465"
                      x="96.81076"
                      y="176.79738"
                      ry="59.037006"
                      inkscape:path-effect="#path-effect71264"
                      d="m 155.84766,214.5918 c -5.42366,-0.0303 -10.82284,2.11504 -14.72297,5.8886 -4.01704,3.81618 -6.40371,9.2653 -6.51227,14.80269 -0.0161,8.59715 -0.002,17.19456 -0.007,25.79181 0.003,19.54448 -0.005,39.08902 0.004,58.63346 0.0752,5.6041 2.48229,11.13309 6.56033,14.98279 4.061,3.91092 9.73691,6.04504 15.36605,5.83512 5.64277,-0.14392 11.17535,-2.66194 14.97518,-6.83847 3.66054,-3.94732 5.68118,-9.3343 5.57892,-14.71188 -0.001,-27.81739 0.003,-55.63481 -0.002,-83.45218 -0.0465,-5.47972 -2.32086,-10.89978 -6.22075,-14.75294 -3.92904,-3.95243 -9.44951,-6.20765 -15.01924,-6.179 z"
                      sodipodi:type="rect" />
                  <rect
                      style="display:inline;fill:#000000;fill-opacity:0.993197;stroke:none;stroke-opacity:1;stop-color:#000000"
                      id="rect71128-2"
                      width="118.07401"
                      height="201.53465"
                      x="177.93309"
                      y="176.79738"
                      ry="59.037006" />
                  <path
                      style="display:inline;fill:#f9e80f;fill-opacity:1;stroke:none;stroke-opacity:1;stop-color:#000000"
                      id="rect71128-5-3"
                      width="118.07401"
                      height="201.53465"
                      x="177.93309"
                      y="176.79738"
                      ry="59.037006"
                      sodipodi:type="rect"
                      d="m 236.9707,214.5918 c -5.42365,-0.0303 -10.82283,2.11505 -14.72295,5.8886 -4.01706,3.81617 -6.40373,9.2653 -6.51228,14.80269 -0.0161,8.59715 -0.002,17.19456 -0.007,25.79181 0.003,19.54448 -0.005,39.08902 0.004,58.63346 0.0752,5.6041 2.48228,11.13309 6.56033,14.98279 4.061,3.91092 9.73691,6.04504 15.36604,5.83512 5.64277,-0.14392 11.17536,-2.66194 14.97519,-6.83847 3.66054,-3.94732 5.68118,-9.3343 5.57892,-14.71188 -0.001,-27.81739 0.003,-55.63481 -0.002,-83.45218 -0.0465,-5.47972 -2.32086,-10.89978 -6.22075,-14.75294 -3.92904,-3.95243 -9.44952,-6.20765 -15.01925,-6.179 z"
                      inkscape:path-effect="#path-effect74243" />
                </g>
                <g
                    id="g1849"
                    transform="translate(-1219.1238,-1197.7302)" />
                <path
                    id="rect884-2"
                    style="display:inline;fill:#000101;fill-opacity:1;stroke:none;stroke-width:0.802367;stop-color:#000000"
                    d="M 151.8457 434.48242 L 395.66602 434.48242 C 416.99164 434.48242 434.16992 417.30414 434.16992 395.97852 L 434.16992 377.36328 C 434.16992 356.03765 416.99163 338.85937 395.66602 338.85938 L 275.63672 338.85938 C 275.41804 338.99085 275.23748 339.09416 275.01758 339.22656 C 270.56725 341.90618 265.86915 344.7738 261 347.80078 C 256.13085 350.82776 251.08988 354.01273 245.95898 357.32422 C 240.82809 360.63571 235.60665 364.07427 230.37109 367.60742 C 225.13554 371.14058 219.88625 374.76897 214.70312 378.46094 C 209.52 382.1529 204.40331 385.90934 199.42969 389.69727 C 196.94288 391.59123 194.49092 393.49227 192.08594 395.39844 C 189.68096 397.3046 187.32305 399.21448 185.01953 401.125 C 182.71601 403.03552 180.46757 404.94651 178.28516 406.85352 C 176.10274 408.76052 173.98504 410.6649 171.94336 412.56055 C 169.90168 414.45619 167.936 416.34428 166.05469 418.2207 C 164.17337 420.09713 162.37709 421.9612 160.67578 423.81055 C 158.97447 425.65989 157.36885 427.49418 155.86719 429.30859 C 154.4232 431.05331 153.08729 432.77713 151.8457 434.48242 z " />
                <path
                    id="path25086"
                    style="display:inline;fill:#000000;fill-opacity:0.39130908;stroke:none;stroke-width:0.802367;stop-color:#000000"
                    d="M 151.8457 434.48242 C 153.08729 432.77713 154.4232 431.05331 155.86719 429.30859 C 157.36885 427.49418 158.97447 425.65989 160.67578 423.81055 C 162.37709 421.9612 164.17337 420.09713 166.05469 418.2207 C 167.936 416.34428 169.90168 414.45619 171.94336 412.56055 C 173.98504 410.6649 176.10274 408.76052 178.28516 406.85352 C 180.46757 404.94651 182.71601 403.03552 185.01953 401.125 C 187.32305 399.21448 189.68096 397.3046 192.08594 395.39844 C 194.49092 393.49227 196.94288 391.59123 199.42969 389.69727 C 204.40331 385.90934 209.52 382.1529 214.70312 378.46094 C 219.88625 374.76897 225.13554 371.14058 230.37109 367.60742 C 235.60665 364.07427 240.82809 360.63571 245.95898 357.32422 C 251.08988 354.01273 256.13085 350.82776 261 347.80078 C 265.86915 344.7738 270.56725 341.90618 275.01758 339.22656 C 275.23748 339.09416 275.41804 338.99085 275.63672 338.85938 L 117.08984 338.85938 C 95.764227 338.85938 78.585937 356.03766 78.585938 377.36328 L 78.585938 395.97852 C 78.585938 417.30413 95.764221 434.48242 117.08984 434.48242 L 151.8457 434.48242 z " />
                <path
                    style="fill:#f9e80f;fill-opacity:1;stroke:none;stroke-width:0.802367;stop-color:#000000"
                    id="rect884"
                    width="332.909"
                    height="72.948425"
                    x="89.923645"
                    y="350.19681"
                    sodipodi:type="rect"
                    ry="25.416424"
                    d="m 115.34007,350.19681 h 282.07615 c 14.0807,0 25.41642,11.33572 25.41642,25.41642 v 22.11558 c 0,14.0807 -11.33572,25.41642 -25.41642,25.41642 H 115.34007 c -14.0807,0 -25.416425,-11.33572 -25.416425,-25.41642 v -22.11558 c 0,-14.0807 11.335725,-25.41642 25.416425,-25.41642 z"
                    inkscape:path-effect="#path-effect1744" />
                <circle
                    style="fill:#8e8404;fill-opacity:1;stroke:none;stop-color:#000000;stroke-opacity:1"
                    id="path13349"
                    cx="140.85533"
                    cy="386.67102"
                    r="17.252357" />
                <path
                    id="path13349-7"
                    style="display:inline;fill:#000101;fill-opacity:1;stroke:none;stop-color:#000000"
                    d="M 187.69336 398.93164 A 17.252357 17.252357 0 0 0 199.80273 403.92383 A 17.252357 17.252357 0 0 0 217.05469 386.67188 A 17.252357 17.252357 0 0 0 214.88477 378.33203 C 214.82429 378.37508 214.76358 378.41788 214.70312 378.46094 C 213.40734 379.38393 212.11645 380.31173 210.83008 381.24219 C 209.54371 382.17265 208.26278 383.10602 206.98828 384.04297 C 205.71378 384.97992 204.44573 385.91887 203.18555 386.86133 C 201.92537 387.80379 200.67309 388.75028 199.42969 389.69727 C 198.18628 390.64425 196.95074 391.59245 195.72656 392.54297 C 194.50239 393.49349 193.28843 394.44535 192.08594 395.39844 C 190.88345 396.35152 189.69202 397.3051 188.51367 398.25977 C 188.23716 398.48378 187.96846 398.70757 187.69336 398.93164 z " />
                <path
                    id="path25123"
                    style="display:inline;fill:#8e8404;fill-opacity:1;stroke:none;stop-color:#000000;stroke-opacity:1"
                    d="M 187.69336 398.93164 C 187.96846 398.70757 188.23716 398.48378 188.51367 398.25977 C 189.69202 397.3051 190.88345 396.35152 192.08594 395.39844 C 193.28843 394.44535 194.50239 393.49349 195.72656 392.54297 C 196.95074 391.59245 198.18628 390.64425 199.42969 389.69727 C 200.67309 388.75028 201.92537 387.80379 203.18555 386.86133 C 204.44573 385.91887 205.71378 384.97992 206.98828 384.04297 C 208.26278 383.10602 209.54371 382.17265 210.83008 381.24219 C 212.11645 380.31173 213.40734 379.38393 214.70312 378.46094 C 214.76358 378.41788 214.82429 378.37508 214.88477 378.33203 A 17.252357 17.252357 0 0 0 199.80273 369.41797 A 17.252357 17.252357 0 0 0 182.55078 386.67188 A 17.252357 17.252357 0 0 0 187.69336 398.93164 z " />
                <circle
                    style="display:inline;fill:#000101;fill-opacity:1;stroke:none;stop-color:#000000"
                    id="path13349-75"
                    cx="260.13223"
                    cy="386.67102"
                    r="17.252357" />
                <circle
                    style="display:inline;fill:#000101;fill-opacity:1;stroke:none;stop-color:#000000"
                    id="path13349-7-4"
                    cx="318.17148"
                    cy="386.67102"
                    r="17.252357" />
                <circle
                    style="display:inline;fill:#000101;fill-opacity:1;stroke:none;stop-color:#000000"
                    id="path13349-7-4-8"
                    cx="375.37811"
                    cy="386.67102"
                    r="17.252357" />
                <path
                    style="fill:none;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
                    d="m 273.98534,303.98655 c 0,0 -197.083344,95.3078 -171.42791,145.90581 25.65544,50.598 -67.897621,-8.9576 -67.897621,-10.79677 0,-1.83916 29.0878,-138.21548 29.0878,-138.21548 z"
                    id="path19618" />
                <path
                    id="rect74680"
                    style="fill:#010100;fill-opacity:1;stroke:none;stroke-width:1.07213;stroke-opacity:1;stop-color:#000000"
                    d="M 342.24414 126.34375 L 342.24414 284.53711 C 342.24414 297.02787 351.78083 307.08398 363.62891 307.08398 C 375.47698 307.08398 385.01562 297.02787 385.01562 284.53711 L 385.01562 126.34375 L 342.24414 126.34375 z " />
                <path
                    id="path87788"
                    style="fill:#8e8404;fill-opacity:1;stroke:none;stroke-width:1.07213;stroke-opacity:1;stop-color:#000000"
                    d="M 342.24414 126.34375 L 385.01562 126.34375 L 385.01562 111.28516 C 385.01562 98.794392 375.47698 88.738281 363.62891 88.738281 C 351.78083 88.738281 342.24414 98.794392 342.24414 111.28516 L 342.24414 126.34375 z " />
                <rect
                    style="fill:#f9e80f;fill-opacity:1;stroke:none;stroke-width:0.808012;stroke-opacity:1;stop-color:#000000"
                    id="rect77653"
                    width="295.17795"
                    height="41.926178"
                    x="102.54843"
                    y="288.99869"
                    ry="0" />
              </g>
            </svg>
            mlAuth
          </a>
        </div>
        <div class="flex-1 flex-grow md:flex-2 xl:flex-3">
          <ul class="text-center mb-6">
            <li class="mt-2 inline-block mr-2 md:block md:mr-0">
              <a href="https://www.planetscale.com" class="font-thin text-primary text-l">Data stored on Planetscale </a>
            </li>
            <li class="mt-2 inline-block mr-2 md:block md:mr-0">
              <a href="https://hashnode.com" class="font-thin text-primary text-l">Inpired by Hashnode</a>
            </li>
            <li class="mt-2 inline-block mr-2 md:block md:mr-0">
              <p class="font-thin text-primary text-l p-2">Built for the Hashnode x Planetscale Hackathon</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "publicFoot"
}
</script>

<style scoped>

</style>