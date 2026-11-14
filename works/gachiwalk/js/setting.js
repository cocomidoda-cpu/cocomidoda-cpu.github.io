let container;
let stage;
window.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);
    stage = document.querySelector('#container');
    container = Scrollbar.init(stage, {
        damping: 0.06,
        delegateTo: document,
        continuousScrolling: true,
        alwaysShowTracks: false,
    });

    ScrollTrigger.scrollerProxy("#container", {

        scrollTop(value) {

            if (arguments.length) {
                container.scrollTop = value;
            }

            return container.scrollTop;

        }
    });
    container.addListener(ScrollTrigger.update);
    ScrollTrigger.defaults({ scroller: stage });

    container.setPosition(0, 0);
    container.track.xAxis.element.remove();


    $('.startPoint').click(function () {
        container.scrollTo(0, 0, 600, {
            callback: () => console.log('done!'),
            easing: easing.easeInOutCirc,
        });

    });


    (function () {


        let v = 0;

        gsap.to(".scroll-content", {
            scrollTrigger: {
                trigger: ".scroll-content",
                start: "top top",
                // end: 'bottom bottom',
                end: () => "+=" + 6000,
                scrub: true,
                onUpdate: self => {
                    // console.log("progress:", self.progress)
                    // v = Math.floor(self.progress * 5);
                    // console.log(v)

                }
            }
        });




        /*


        */

/*


*/



    })();


    // Only necessary to correct marker position - not needed in production
    if (document.querySelector('.gsap-marker-scroller-start')) {
        const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

        container.addListener(({ offset }) => {
            gsap.set(markers, { marginTop: -offset.y })
            $('.posNum').html(offset.y);
        });
    }



})


