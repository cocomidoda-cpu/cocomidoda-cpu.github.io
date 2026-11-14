window.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(CustomEase);
CustomEase.create("ease", "0.175, 0.885, 0.32, 1.475 ");
  var $data = $('.Quick_data')
  var _blank = 0;
  var scroll_Num = 79309;
  var time = 1000;
  $($data).text(scroll_Num)
  $('.Quick').click(function () {
    container.scrollTo(_blank, scroll_Num, time, )
    $('.Quick').addClass('on')
    setTimeout(function () {
      $('.Quick').removeClass('on')
    }, 1500);
  })
  Splitting()

var restart = "restart none reverse none"

$('.nav > ul >li').click(function(){

  var n = $(this).index()
  var posX = 100 * n
  // $('.color_line').css({width:100 + 'px'})
$('.nav > ul > li').removeClass('on')  

// 메인 0 리서치 5686 목표 53371 아웃풋 디자인 61713

  if(n ==0){
    container.scrollTo(0, 0 ,1000 )
    $('.color_line').css({left:posX + "px"})

       
    setTimeout(function(){
      $('.nav >ul >li').eq(n).addClass('on')
    },300)
  }
  if(n ==1){
    container.scrollTo(0, 5686 ,1000 )


    $('.color_line').css({left:posX + "px",width:100 + "px"})

       
    setTimeout(function(){
      $('.nav >ul >li').eq(n).addClass('on')
    },300)


  }

  if(n ==2){
    container.scrollTo(0, 53371 ,1000 )
    $('.color_line').css({left:posX + "px"})

       
    setTimeout(function(){
      $('.nav >ul >li').eq(n).addClass('on')
    },300)
  }

  if(n ==3){
    container.scrollTo(0, 61713 ,1000 )
    $('.color_line').css({left:posX + "px"})

       
    setTimeout(function(){
      $('.nav >ul >li').eq(n).addClass('on')
    },300)
  }

},)


setTimeout(function(){
  $("#sec01").mousemove(function (e) {
    var mouseX = e.pageX;
    var mouseY = e.pageY;
    var ani_x = mouseX*0.06;
    var ani_y = mouseY*0.08;

    var ani_x01 = mouseX*0.01;
    var ani_y01 = mouseY*0.01;

    // gsap.to(".sec01_img_list > li ", {x:ani_x,y:ani_y, stagger:0.1, duration:1,ease: "power4.out",})
    gsap.to(".sec01_img_list > li ", {x:ani_x,y:ani_y,stagger:0.008,  duration:0.8,ease: "power4.out",})

    gsap.to(".mock_up_list > li ", {x:ani_x01,y:ani_y01,stagger:0.008,  duration:0.8,ease: "power4.out",})

  });
  $("#sec02").mouseleave(function () {
 
  })
// 5초 == > 1000 =1초 
},5000)

  

  gsap.from(".sec01_img_list >li >img", {scale:0,stagger:0.2, ease:"ease",delay:0.3})





  gsap.to("#sec01", {
    scrollTrigger:
     {trigger: "#sec01",
     start: "top top",
     end:'5000 bottom',
     pin:true,
     markers:true,
     scrub:true,
    },
  })

  gsap.from(".sec01_text01 >span .char", {
    scrollTrigger:
     {trigger: ".sec01_text01",
     start: "top top",
     end:'2000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    stagger:0.1,
    color:"#91d5fb",
    ease: "steps(1)",
  })


  gsap.from(".sec01_text02 >span .char", {
    scrollTrigger:
     {trigger: ".sec01_text01",
     start: "2000 top",
     end:'3500 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    stagger:0.1,
    color:"#91d5fb",
    ease: "steps(1)",
  })

  gsap.from(".sec01_text03 >span .char", {
    scrollTrigger:
     {trigger: ".sec01_text01",
     start: "2000 top",
     end:'5000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    stagger:0.1,
    color:"#91d5fb",
    ease: "steps(1)",
  })

// sec02 -----------------------

  gsap.to("#sec02", {
    scrollTrigger:
     {trigger:  "#sec02",
     start: "top top",
     end:'5000 bottom',
     pin:true,
     markers:true,
     scrub:true,
    },
  })


  gsap.from(".t  .char", {
    scrollTrigger:
     {trigger: ".sec02_title",
     start: "-1000 top",
     end:'500 bottom',
     pin:false,
     markers:true,
     scrub:2,
    },
    color: "#94d6ff",
    stagger:0.4,
    duration:2.5,
    ease: "sine.out",
  })

  gsap.from(" .sec02_title  .char", {
    scrollTrigger:
     {trigger: ".sec02_title",
     start: "-700 top",
     end:'500 bottom',
     pin:false,
     markers:true,
     scrub:2,
    },
    color:"#ccc",
    stagger:0.4,
    duration:2.5,
    ease: "sine.out",
  })

  gsap.from(".sec02_text > .char", {
    scrollTrigger:
     {trigger: ".sec02_text",
     start: "-1000 top",
     end:'800 bottom',
     pin:false,
     markers:true,
     scrub:2,
    },
    color:"#cccc",
    duration:2.5,
    ease: "sine.out",
  })

  gsap.from(".sec02_text > li > p > span .char", {
    scrollTrigger:
     {trigger: ".sec02_text",
     start: "-1000 top",
     end:'800 bottom',
     pin:false,
     markers:true,
     scrub:2,
    },
    color:"#cccc",
    stagger:0.2,
    duration:1.5,
    ease: "sine.out",
  })

  gsap.from(".graph_small", {
    scrollTrigger:
     {trigger: ".sec02_text",
     start: "-800 top",
     end:'700 bottom',
     pin:false,
     markers:true,
     scrub:2,
    },
    opacity:0.1,
  })


  // sec03 -----------------------

  gsap.to("#sec03", {
    scrollTrigger:
     {trigger: "#sec03",
     start: "top top",
     end:'28500 bottom',
     pin:true,
     markers:true,
     scrub:false,
    },
  })
    // y:"-500px",
  
  gsap.to(".sec03_title_list_01", {
    scrollTrigger:
     {trigger: ".sec03_card_list_01",
     start: "800 top",
     end:'2000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    y:"-200px",
    // opacity:0,
    // duration:1,
    ease: "sine.out",
  })

  gsap.to(".sec03_card_list_01_con", {
    scrollTrigger:
     {trigger: ".sec03_con",
     start: "1000 top",
     end:'2500 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    y:"-80px",
    ease: "power1.out",
    

  })

  gsap.to(".sec03_card_list_01 >li:nth-child(1)", {
    scrollTrigger:
     {trigger: ".sec03_card_list_01",
     start: "2300 top",
     end:'5000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    x:540,
    rotate:20,
    // duration:2.5,
    ease: "sine.out",

  })

  gsap.to(".sec03_card_list_01 >li:nth-child(2)", {
    scrollTrigger:
     {trigger: ".sec03_card_list_01",
     start: "2300 top",
     end:'5000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    rotate:20,
    // duration:2.5,
    ease: "sine.out",

  })

  gsap.to(".sec03_card_list_01 >li:nth-child(3)", {
    scrollTrigger:
     {trigger: ".sec03_card_list_01",
     start: "2300 top",
     end:'5000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    x:-540,
    y:-30,
    rotate:20,
    // duration:2.5,
    ease: "sine.out",
  })

  gsap.to(".sec03_card_list_01", {
    scrollTrigger:
     {trigger: ".sec03_card_list_01",
     start: "4300 top",
     end:'10000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    scale:0,
    rotate:240,
    opacity:0
  })


  gsap.from(".sec03_title_list_02", {
    scrollTrigger:
     {trigger: ".sec03_card_list_01",
     start: "8000 top",
     end:'20000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    scale:0.4,
    opacity:0,

  })

  // gsap.from(".sec03_opacity_ef", {
  //   scrollTrigger:
  //    {trigger: ".sec03_card_list_01",
  //    start: "4000 top",
  //    end:'7000 bottom',
  //    pin:false,
  //    markers:true,
  //    scrub:true,
  //   },
  //   opacity:0.4,

  // })


  gsap.to(".sec03_opacity_ef", {
    scrollTrigger:
     {trigger: ".sec03_card_list_01",
     start: "19000 top",
     end:'26000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    scale:0.8,
    x:100
  })

  gsap.from(".sec03_review_list", {
    scrollTrigger:
     {trigger: ".sec03_card_list_01",
     start: "13000 top",
     end:'16000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    y:800,
    duration:2.5,
    ease: "power4.out",
  })

  gsap.to(".sec03_review_list >li", {
    scrollTrigger:
     {trigger: ".sec03_card_list_01",
     start: "16500 top",
     end:'19000 bottom',
     pin:false,
     markers:true,
     scrub:2,
    },
    y:-700, 
    stagger:-0.5,
    rotate:0,
  })

  gsap.to(".sec03_title_blue", {
    scrollTrigger:
     {trigger: ".sec03_card_list_01",
     start: "22000 top",
     end:'24000 bottom',
     pin:false,
     markers:true,
     scrub:2,
    },
    opacity:0
  })

  gsap.from(".sec03_title_red", {
    scrollTrigger:
     {trigger: ".sec03_card_list_01",
     start: "21500 top",
     end:'24000 bottom',
     pin:false,
     markers:true,
     scrub:2,
    },
    opacity:0
  })

  gsap.to(".sec03_text", {
    scrollTrigger:
     {trigger: ".sec03_card_list_01",
     start: "25000 top",
     end:'27000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    y:"-1020px",
    duration:1.5,
  })

  gsap.to(".sec03_hand", {
    scrollTrigger:
     {trigger: ".sec03_card_list_01",
     start: "26000 top",
     end:'28000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    y:"-1400px",
    duration:1.5,
    opacity:1,
  })

  gsap.to(".sec03_van", {
    scrollTrigger:
     {trigger: ".sec03_card_list_01",
     start: "26500 top",
     end:'28300 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    y:"-1100px",
    // duration:1.5,
    opacity:1,
  })

  gsap.from(".card_bad_list >li:nth-child(1)", {
    scrollTrigger:
     {trigger: ".sec03_card_list_01",
     start: "26000 top",
     end:'28600 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    x:"-1400px",
    duration:1.5,
    ease: "steps(1000)",
  })

  gsap.from(".card_bad_list >li:nth-child(2)", {
    scrollTrigger:
     {trigger: ".sec03_card_list_01",
     start: "26000 top",
     end:'28600 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    x:"1400px",
    duration:1.5,
    ease: "steps(1000)",
  })

  gsap.from(".card_bad_list >li:nth-child(3)", {
    scrollTrigger:
     {trigger: ".sec03_card_list_01",
     start: "26800 top",
     end:'29200 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    x:"-1500px",
    duration:1.5,
    ease: "steps(1000)",
  })

  gsap.from(".card_bad_list >li:nth-child(4)", {
    scrollTrigger:
     {trigger: ".sec03_card_list_01",
     start: "26800 top",
     end:'29200 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    x:"1800px",
    duration:1.5,
    ease: "steps(1000)",
  })


  // sec04 --------------------

  gsap.to("#sec04", {
    scrollTrigger:
     {trigger:  "#sec04",
     start: "top top",
     end:'7000 bottom',
     pin:true,
     markers:true,
     scrub:true,
    },
  })

  gsap.to(".sec04_con", {
    scrollTrigger:
     {trigger:  ".sec04_card_list",
     start: "1000 top",
     end:'3000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    ease: "power1.out",
    y:"-160px",
  })

  gsap.to(".sec04_title", {
    scrollTrigger:
     {trigger:  ".sec04_card_list",
     start: "1000 top",
     end:'2500 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    y:"-500px",
  })

  // gsap.to(".sec04_card_list >li", {
  //   scrollTrigger:
  //    {trigger:  ".sec04_card_list",
  //    start: "3000 top",
  //    end:'8000 bottom',
  //    pin:false,
  //    markers:true,
  //    scrub:true,
  //   },
  //   y:"-1000px",
  //   stagger:0.5
  // })

  gsap.from(".sec04_card_title", {
    scrollTrigger:
     {trigger: ".sec04_con",
     start: "3500 top",
     end:'bottom bottom',
     pin:false,
     markers:true,
     scrub:false,
     toggleActions:restart

    },
    opacity:0,
    scale:1.1,
  })

  gsap.from(".sec04_card_03_no_list >li", {
    scrollTrigger:
     {trigger: ".sec04_con",
     start: "3800 top",
     end:'bottom bottom',
     pin:false,
     markers:true,
     scrub:false,
     toggleActions:restart

    },
    opacity:0,
    // scale:1.1,
    stagger:0.1
  })



  gsap.from(".sec04_card_03_text_list >li", {
    scrollTrigger:
     {trigger: ".sec04_con",
     start: "4000 top",
     end:'bottom bottom',
     pin:false,
     markers:true,
     scrub:false,
     toggleActions:restart

    },
    opacity:0,
    // scale:1.05,
    stagger:0.1
  })
  
  // sec04 -------------------------
  
  gsap.to(".sec04_card_01", {
    scrollTrigger:
     {trigger:  ".sec04_card_list",
     start: "2000 top",
     end:'4000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    y:"-1000px"
  })

    
  gsap.to(".sec04_card_02", {
    scrollTrigger:
     {trigger:  ".sec04_card_list",
     start: "3000 top",
     end:'5000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    y:"-1000px"
  })

  // sec05 ---------------

  gsap.to(".sec05_card_01", {
    scrollTrigger:
     {trigger: ".sec05_card_list",
     start: "100 top",
     end:'3000 bottom',
     pin:false,
     markers:true,
     scrub:2,
    },
    y:"-170px",
  })


  gsap.to(".sec05_card_02", {
    scrollTrigger:
     {trigger: ".sec05_card_list",
     start: "100 top",
     end:'3000 bottom',
     pin:false,
     markers:true,
     scrub:2,
    },
    y:"170px",
  })

  gsap.to(".sec05_card_03", {
    scrollTrigger:
     {trigger: ".sec05_card_list",
     start: "100 top",
     end:'3000 bottom',
     pin:false,
     markers:true,
     scrub:2,
    },
    y:"-170px",
  })

  gsap.from(".sec05_book", {
    scrollTrigger:
     {trigger: ".sec05_card_list",
     start: "top top",
     end:'500 bottom',
     pin:false,
     markers:true,
    //  scrub:2,
    },
    ease:"ease",
    scale:0,
  })


  gsap.from(".sec05_hand", {
    scrollTrigger:
     {trigger: ".sec05_card_list",
     start: "500 top",
     end:'1000 bottom',
     pin:false,
     markers:true,
    //  scrub:2,
    },
    ease:"ease",
    scale:0,
  })

  gsap.from(".question", {
    scrollTrigger:
     {trigger: ".sec05_card_list",
     start: "700 top",
     end:'1200 bottom',
     pin:false,
     markers:true,
    //  scrub:2,
    },
    ease:"ease",
    scale:0,
  })


  // sec06 ---------------


  gsap.to("#sec06", {
    scrollTrigger:
     {trigger: "#sec06",
     start: "500 top",
     end:'3000 bottom',
     pin:true,
     markers:true,
     scrub:2,
    },
  })


  gsap.from(".sec06_con_02", {
    scrollTrigger:
     {trigger: ".sec06_con_02",
     start: "-500 top",
     end:'800 bottom',
     pin:false,
     markers:true,
     scrub:2,
    },
    scale:0.8,
    opacity:0,
  borderRadius: "100px"
  })



  gsap.from(".sec06_arrow", {
    scrollTrigger: {
      trigger: ".sec06_con_02",
      start: "500 top",
      end: 'bottom bottom',
      pin: false,
      markers: true,
      // scrub: true,
    },
    x: -90,
    y: 90,})


      gsap.from(".valuewalk_after", {
        scrollTrigger: {
          trigger: ".sec06_con_02",
          start: "500 top",
          end: 'bottom bottom',
          pin: false,
          markers: true,
          // scrub: true,
        },
        x: -210,
        y: 210,
        scale: 0.5,
        delay:1
      });

// sec07 ----------------------



// gsap.from(".sec07_title >img", {
//   scrollTrigger:
//    {trigger: "#sec07",
//    start: "-200 top",
//    end:'1000 bottom',
//    pin:false,
//    markers:true,
//    scrub:true,
//   },
//   y:20,
//   opacity:0.2,
//   duration:1
// })


gsap.from(".sec07_box", {
  scrollTrigger:
  {trigger: "#sec07",
  start: "-300 top",
  end:'1000 bottom',
  pin:false,
  markers:true,
  scrub:true,
  },
  y:30,
  opacity:0,
  // stagger:0.4,
  // delay:1
})

gsap.from(".sec07_arrow", {
  scrollTrigger:
  {trigger: "#sec07",
  start: "-200 top",
  end:'1200 bottom',
  pin:false,
  markers:true,
  scrub:true,
  },
  y:30,
  opacity:0,
  duration:1,
  // stagger:0.4,
  // delay:1
})

gsap.from(".sec07_conclusion", {
  scrollTrigger:
  {trigger: "#sec07",
  start: "-100 top",
  end:'1500 bottom',
  pin:false,
  markers:true,
  scrub:true,
  },
  y:30,
  opacity:0,
  duration:1,
  // stagger:0.4,
  // delay:1
})



gsap.from(".sec07_icon", {
  scrollTrigger:
    {trigger: "#sec07",
    start: "100 top",
    end:'bottom bottom',
    pin:false,
    markers:true,
    scrub:false,
    toggleActions:restart

  },
  ease:"ease",
  scale:0,
})

// sec08 ------------------

  gsap.to("#sec08", {
    scrollTrigger:
     {trigger: "#sec08",
     start: "top top",
     end:'9000 bottom',
     pin:true,
     markers:true,
     scrub:false,
    },
    // y:-1080
  })

  gsap.from(".sec08_title", {
    scrollTrigger:
      {trigger: "#sec08",
      start: "-600 top",
      end:'1500 bottom',
      pin:false,
      markers:true,
      scrub:true,
      // toggleActions:restart
  
    },
    opacity:0,
    x:-30,
    ease: "power4.out",
  })


  gsap.from(".sec08_coin_con >img", {
    scrollTrigger:
      {trigger: "#sec08",
      start: "-350 top",
      end:'1200 bottom',
      pin:false,
      markers:true,
      scrub:true,
      // toggleActions:restart
  
    },
    ease:"ease",
    scale:0,
    stagger:0.1,
    y:50
    // ease: "bounce.out",
  })

  gsap.to(".sec08_slider", {
    scrollTrigger:
     {trigger: ".sec08_slider",
     start: "1450 top",
     end:'9000 bottom',
     pin:false,
     markers:true,
     scrub:2,

    },
    // x:"-5760.44px"
    x:"-2900px"
  })

  
gsap.to(".sec09_mock_up", {
  scrollTrigger:
    {trigger: "#sec09",
    start: "500 top",
    end:'2800 bottom',
    pin:false,
    markers:true,
    scrub:true,
    // toggleActions:restart

  },
  y:"1600px"
})



  
gsap.from(".sec09_title_con_01", {
  scrollTrigger:
    {trigger: "#sec09",
    start: "-500 top",
    end:'800 bottom',
    pin:false,
    markers:true,
    scrub:true,
    // toggleActions:restart

  },
  opacity:0,

})

  
gsap.from(".sec09_title_con_02", {
  scrollTrigger:
    {trigger: "#sec09",
    start: "1300 top",
    end:'2500 bottom',
    pin:false,
    markers:true,
    scrub:true,
    // toggleActions:restart

  },
  opacity:0,

})

gsap.from(".sec09_icon_01>img", {
  scrollTrigger:
    {trigger: "#sec09",
    start: "top top",
    end:'1800 bottom',
    pin:false,
    markers:true,
    scrub:true,
    // toggleActions:restart

  },
  scale:0,
  stagger:0.2, 
  ease:"ease"
})


gsap.from(".sec09_part_con >img", {
  scrollTrigger:
   {trigger: "#sec09",
   start: "1600 top",
   end:'3000 bottom',
   pin:false,
   markers:true,
   scrub:true,
  //  toggleActions:restart

  },
  opacity:0,
  stagger:0.1
})


gsap.from(".sec09_confetti", {
  scrollTrigger:
    {trigger: "#sec09",
    start: "1650 top",
    end:'3200 bottom',
    pin:false,
    markers:true,
    scrub:true,
    // toggleActions:restart

  },
  scale:0,
  // ease:"ease"
  ease: "elastic.out(1,0.3)",
})

gsap.from(".sec10_title_con", {
  scrollTrigger:
    {trigger: "#sec10",
    start: "-500 top",
    end:'850 bottom',
    pin:false,
    markers:true,
    scrub:true,
    // toggleActions:restart

  },
  opacity:0,
  ease: "power3.out",


})

  gsap.from(".sec10_mock_up_list >li", {
    scrollTrigger:
     {trigger: "#sec10",
     start: "300 top",
     end:'bottom bottom',
     pin:false,
    //  markers:true,
     scrub:true,
    //  toggleActions:restart

    },
    opacity:0,
    // scale:1.05,
    stagger:0.2
  })


  gsap.from(".sec10_text_list >li", {
    scrollTrigger:
     {trigger: "#sec10",
     start: "300 top",
     end:'1200 bottom',
     pin:false,
     markers:true,
    //  scrub:true,
     toggleActions:restart
    },
    opacity:0,
    scale:1.05,
    stagger:0.2,
    delay:0.5,
    y:10
  })


  gsap.from(".sec10_no_list >li", {
    scrollTrigger:
     {trigger: "#sec10",
     start: "250 top",
     end:'1200 bottom',
     pin:false,
     markers:true,
    //  scrub:true,
     toggleActions:restart

    },
    opacity:0,
    scale:1.1,
    stagger:0.2,
    // delay:0.7,
    y:10

  })
  gsap.from(".sec11_man", {
    scrollTrigger:
     {trigger: "#sec11",
     start: "-350 top",
     end:'800 bottom',
     pin:false,
     markers:true,
     scrub:true,
     toggleActions:restart

    },
    scale:0.75,
    opacity:0,
    x:30,
    y:30,
    // duration:1.0,
    // rotate:360
  })

  gsap.from(".sec11_title_con >img", {
    scrollTrigger:
     {trigger: "#sec11",
     start: "-400 top",
     end:'1000 bottom',
     pin:false,
     markers:true,
    //  scrub:true,
    //  toggleActions:restart

    },
    opacity:0,
    // scale:1.05,
    // stagger:0.1
  })

  gsap.from(".sec11_no >img", {
    scrollTrigger:
     {trigger: "#sec11",
     start: "500 top",
     end:'bottom bottom',
     pin:false,
     markers:true,
    //  scrub:true,
     toggleActions:restart

    },
    opacity:0,
    // scale:1.05,
    stagger:0.1
  })

  gsap.from(".sec11_mock_up >img", {
    scrollTrigger:
     {trigger: "#sec11",
     start: "-300 top",
     end:'bottom bottom',
     pin:false,
     markers:true,
    //  scrub:true,
    //  toggleActions:restart

    },
    opacity:0,
    // scale:1.05,
    stagger:0.5
  })

  

  gsap.from(".sec11_mock_up_text >img", {
    scrollTrigger:
     {trigger: "#sec11",
     start: "500 top",
     end:'bottom bottom',
     pin:false,
     markers:true,
    //  scrub:true,
     toggleActions:restart

    },
    opacity:0,
    // scale:1.05,
    stagger:0.2
  })

  gsap.from(".sec11_popper", {
    scrollTrigger:
      {trigger: "#sec11",
      start: "300 top",
      end:'3200 bottom',
      pin:false,
      markers:true,
      // scrub:true,
      // toggleActions:restart
  
    },
    scale:0,
    // ease:"ease"
    ease: "elastic.out(1,0.3)",
  })
  

  gsap.from(".sec12_title_con >img", {
    scrollTrigger:
     {trigger: "#sec12",
     start: "-400 top",
     end:'1000 bottom',
     pin:false,
     markers:true,
    //  scrub:true,
    //  toggleActions:restart

    },
    opacity:0,
    // scale:1.05,
    // stagger:0.1
  })

  gsap.from(".sec12_mock_up>img", {
    scrollTrigger:
     {trigger: "#sec12",
     start: "-400 top",
     end:'1600 bottom',
     pin:false,
     markers:true,
    //  scrub:true,
    //  toggleActions:restart

    },
    opacity:0,
    // scale:1.05,
    stagger:0.5
  })

  gsap.from(".sec12_no_con >img", {
    scrollTrigger:
     {trigger: "#sec12",
     start: "200 top",
     end:'bottom bottom',
     pin:false,
     markers:true,
     scrub:true,
    //  toggleActions:restart

    },
    opacity:0,
    // scale:1.05,
    stagger:0.1
  })

  gsap.from(".sec12_card_con >img", {
    scrollTrigger:
     {trigger: "#sec12",
     start: "-200 top",
     end:'bottom bottom',
     pin:false,
     markers:true,
     scrub:true,
     toggleActions:restart
    },
    opacity:0,
    // scale:1.05,
    stagger:0.1
  })

  gsap.from(".sec12_card_text >img", {
    scrollTrigger:
     {trigger: "#sec12",
     start: "200 top",
     end:'bottom bottom',
     pin:false,
     markers:true,
    //  scrub:true,
    //  toggleActions:restart

    },
    opacity:0,
    // scale:1.05,
    stagger:0.1
  })

  gsap.from(".sec12_friends_icon >img", {
    scrollTrigger:
     {trigger: "#sec12",
     start: "400 top",
     end:'bottom bottom',
     pin:false,
     markers:true,
     scrub:true,
     toggleActions:restart

    },
    opacity:0,
    scale:0,
    stagger:0.1,
    ease: "circ.out"
  })



  gsap.to("#sec13", {
    scrollTrigger:
     {trigger: "#sec13",
     start: "top top",
     end:'16000 bottom',
     pin:true,
     scrub:false,
    },
  })



  gsap.to(".sec13_mockup > img", {
    scrollTrigger:
     {trigger: ".sec13_mockup",
     start: "2000 top",
     end:'21000 bottom',
     pin:false,
     scrub:2,
    },
    y:-1000,
    stagger:0.5,
    ease: "power4.out",
  })

  // gsap.to(".sec13_mock_up_case", {
  //   scrollTrigger:
  //    {trigger: ".sec13_mockup",
  //    start: "14500 top",
  //    end:'16500 bottom',
  //    pin:false,
  //    scrub:2,
  //   },
  //   opacity:0,
  //   // y:-1000,
  //   // stagger:0.5,
  //   ease: "power4.out",
  // })

  // gsap.to(".sec13_mockup > img:nth-child(2)", {
  //   scrollTrigger:
  //    {trigger: ".sec13_mockup",
  //    start: "4500 top",
  //    end:'5500 bottom',
  //    pin:false,
  //    scrub:true,
  //   },
  //   y:-800,

  // })




  gsap.to(".sec13_step_01 >img", {
    scrollTrigger:
     {trigger: ".sec13_con",
     start: "1500 top",
     end:'3000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    opacity:0,
  })



  gsap.from(".sec13_step_02", {
    scrollTrigger:
     {trigger: ".sec13_con",
     start: "2000 top",
     end:'4000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    opacity:0,
  })

  gsap.to(".sec13_step_02 >img", {
    scrollTrigger:
     {trigger: ".sec13_con",
     start: "3000 top",
     end:'5000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    opacity:0,
  })


  gsap.from(".sec13_step_03", {
    scrollTrigger:
     {trigger: ".sec13_con",
     start: "4500 top",
     end:'6500 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    opacity:0,
  })

  gsap.to(".sec13_step_03 >img", {
    scrollTrigger:
     {trigger: ".sec13_con",
     start: "6500 top",
     end:'8000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    opacity:0,
  })

  gsap.from(".sec13_step_04", {
    scrollTrigger:
     {trigger: ".sec13_con",
     start: "8000 top",
     end:'10000 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    opacity:0,
  })

  gsap.to(".sec13_step_04 >img", {
    scrollTrigger:
     {trigger: ".sec13_con",
     start: "10000 top",
     end:'12500 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    opacity:0,
  })

  gsap.from(".sec13_step_05", {
    scrollTrigger:
     {trigger: ".sec13_con",
     start: "12500 top",
     end:'14500 bottom',
     pin:false,
     markers:true,
     scrub:true,
    },
    opacity:0,
  })

  // gsap.to(".sec13_step_05 >img", {
  //   scrollTrigger:
  //    {trigger: ".sec13_con",
  //    start: "14500 top",
  //    end:'16500 bottom',
  //    pin:false,
  //    markers:true,
  //    scrub:true,
  //   },
  //   opacity:0,
  // })

// sec14 ----------


  gsap.to("#sec14", {
    scrollTrigger:
     {trigger: "#sec14",
     start: "top top",
     end:'14000 bottom',
     pin:true,
     markers:true,
     scrub:false,
    },
    // y:-1080
  })

  gsap.to(".sec14_slider", {
    scrollTrigger:
     {trigger: ".sec14_slider",
     start: "top top",
     end:'14000 bottom',
     pin:false,
     markers:true,
     scrub:2,
    },
    // x:"-5760.44px"
    x:"-4042.37px"

  })


  gsap.from(".sec14_screen_02, .sec14_screen_01,.sec14_mock_up", {
    scrollTrigger:
     {trigger: ".sec14_slider",
     start: "-300 top",
     end:'bottom bottom',
     pin:false,
     markers:true,
     scrub:true,
    //  toggleActions:restart
    },
    opacity:0,
    stagger:0.1,
    y:-50,
    duration:1,
    // ease: "power4.out",
  })

  gsap.from(".sec14_title_eng", {
    scrollTrigger:
     {trigger: ".sec14_slider",
     start: "-300 top",
     end:'bottom bottom',
     pin:false,
     markers:true,
     scrub:true,
    //  toggleActions:restart
    },
    opacity:0,
    duration:1,
    y:20
  })

  gsap.from(".sec14_title", {
    scrollTrigger:
     {trigger: ".sec14_slider",
     start: "-300 top",
     end:'bottom bottom',
     pin:false,
     markers:true,
     scrub:true,
    //  toggleActions:restart
    },
    opacity:0,
    duration:1.2,
    y:20
  })

  gsap.from(".sec14_btn", {
    scrollTrigger:
     {trigger: ".sec14_slider",
     start: "-300 top",
     end:'bottom bottom',
     pin:false,
     markers:true,
     scrub:true,
    //  toggleActions:restart
    },
    opacity:0,
    duration:1.2,
    y:20
  })



// sec15 ---------------

gsap.from(".sec15_round", {
  scrollTrigger:
   {trigger: ".sec14_slider",
   start: "2000 top",
   end:'3500 bottom',
   pin:false,
   markers:true,
   scrub:true,
   toggleActions:restart

  },
  opacity:0,
  scale:0,
  // stagger:0.1,
  ease: "circ.out",
  duration:1
})


// sec18---------------------

gsap.from(".sec18_title_con", {
  scrollTrigger:
   {trigger: "#sec18",
   start: "-500 top",
   end:'1000 bottom',
   pin:false,
   markers:true,
   scrub:true,
  //  toggleActions:restart

  },
  opacity:0,
  // scale:1.05,
  // stagger:0.1
})

// gsap.from(".sec18_mock_up_con >img", {
//   scrollTrigger:
//    {trigger: "#sec18",
//    start: "-200 top",
//    end:'bottom bottom',
//    pin:false,
//    markers:true,
//    scrub:true,
//   //  toggleActions:restart

//   },
//   opacity:0,
//   // scale:1.05,
//   stagger:0.5
// })


gsap.from(".sec18_mock_up_box > img", {
  scrollTrigger:
   {trigger: "#sec18",
   start: "500 top",
   end:'bottom bottom',
   pin:false,
   markers:true,
   scrub:true,
  },
  // y:50,
  stagger:0.2,
  rotateX:90,
  opacity:0
})

gsap.from(".sec18_componant >img", {
  scrollTrigger:
   {trigger: "#sec18",
   start: "2000 top",
   end:'bottom bottom',
   pin:false,
   markers:true,
   scrub:true,
  },
  // y:50,
  stagger:0.5,
  opacity:0
})




gsap.from(".sec18_icon_01,.sec18_icon_02,.sec18_icon_03,.sec18_icon_04", {
  scrollTrigger:
   {trigger: "#sec18",
   start: "top top",
   end:'1900 bottom',
   pin:false,
   markers:true,
   scrub:true,
  //  toggleActions:restart

  },
  scale:0,
  stagger:0.5, 
  ease:"ease"
})

gsap.from(".sec18_icon_05,.sec18_icon_06,.sec18_icon_07", {
  scrollTrigger:
   {trigger: "#sec18",
   start: "1800 top",
   end:'bottom bottom',
   pin:false,
   markers:true,
   scrub:true,
  //  toggleActions:restart

  },
  scale:0,
  stagger:0.5, 
  ease:"ease"
})

gsap.from(".sec18_text_01,sec18_text_02,sec18_text_03", {
  scrollTrigger:
   {trigger: "#sec18",
   start: "top top",
   end:'2000 bottom',
   pin:false,
   markers:true,
   scrub:true,
  //  toggleActions:restart

  },
  opacity:0,
  // scale:1.05,
  stagger:0.3
})

gsap.from(".sec18_text_04", {
  scrollTrigger:
   {trigger: "#sec18",
   start: "2000 top",
   end:'bottom bottom',
   pin:false,
   markers:true,
   scrub:true,
  //  toggleActions:restart

  },
  opacity:0,
  // scale:1.05,
  stagger:0.1
})

gsap.from(".sec18_text_05", {
  scrollTrigger:
   {trigger: "#sec18",
   start: "2100 top",
   end:'bottom bottom',
   pin:false,
   markers:true,
   scrub:true,
  //  toggleActions:restart

  },
  opacity:0,
})

gsap.from(".sec18_text_06", {
  scrollTrigger:
   {trigger: "#sec18",
   start: "2200 top",
   end:'bottom bottom',
   pin:false,
   markers:true,
   scrub:true,
  //  toggleActions:restart

  },
  opacity:0,
})



// sec19 ------------------


gsap.from(".sec19_title_con", {
  scrollTrigger:
   {trigger: "#sec19",
   start: "-500 top",
   end:'1000 bottom',
   pin:false,
   markers:true,
   scrub:true,
  },
  opacity:0,
})

gsap.from(".sec19_icon_con", {
  scrollTrigger:
   {trigger: "#sec19",
   start: "-200 top",
   end:'1000 bottom',
   pin:false,
   markers:true,
   scrub:true,
  },
  opacity:0
})

gsap.from(".sec19_mock_up_con > img", {
  scrollTrigger:
   {trigger: "#sec19",
   start: "-200 top",
   end:'bottom bottom',
   pin:false,
   markers:true,
   scrub:true,
  },
  // y:50,
  stagger:0.2,
  opacity:0
})

// sec20 -----------

gsap.from(".sec20_title_con", {
  scrollTrigger:
   {trigger: "#sec20",
   start: "-500 top",
   end:'1000 bottom',
   pin:false,
   markers:true,
   scrub:true,
  },
  // y:50,
  opacity:0,
})

gsap.from(".sec20_mock_up_con > img", {
  scrollTrigger:
   {trigger: "#sec20",
   start: "-200 top",
   end:'bottom bottom',
   pin:false,
   markers:true,
  //  scrub:true,
  },
  // y:50,
  stagger:0.2,
  opacity:0
})

gsap.from(".sec20_no_list >li", {
  scrollTrigger:
   {trigger: "#sec20",
   start: "top top",
   end:'bottom bottom',
   pin:false,
   markers:true,
   scrub:true,
  //  toggleActions:restart

  },
  opacity:0,
  // scale:1.05,
  stagger:0.5
})

gsap.from(".sec20_text_list >li", {
  scrollTrigger:
   {trigger: "#sec20",
   start: "top top",
   end:'bottom bottom',
   pin:false,
   markers:true,
   scrub:true,
  //  toggleActions:restart

  },
  opacity:0,
  // scale:1.05,
  stagger:0.5
})

gsap.from(".sec20_friends_icon >img", {
  scrollTrigger:
   {trigger: "#sec20",
   start: "400 top",
   end:'1500 1000',
   pin:false,
   markers:true,
   scrub:true,
   toggleActions:restart

  },
  opacity:0,
  scale:0,
  stagger:0.1,
  ease: "circ.out"
})

// sec21 --------

// gsap.from("#sec21", {
//   scrollTrigger:
//    {trigger: "#sec21",
//    start: "top top",
//    end:'2000 bottom',
//    pin:true,
//    markers:true,
//    scrub:true,
//   },
//   // y:50,
//   // opacity:0,
// })

gsap.from(".sec21_title_con", {
  scrollTrigger:
   {trigger: "#sec21",
   start: "-500 top",
   end:'1000 bottom',
   pin:false,
   markers:true,
   scrub:true,
  },
  // y:50,
  opacity:0,
})

gsap.from(".sec21_mock_up", {
  scrollTrigger:
   {trigger: "#sec21",
   start: "-300 top",
   end:'bottom bottom',
   pin:false,
   markers:true,
   scrub:true,
  },
  // y:50,
  // stagger:0.2,
  opacity:0
})

gsap.from(".sec21_part_con >img", {
  scrollTrigger:
   {trigger: "#sec21",
   start: "-300 top",
   end:'bottom bottom',
   pin:false,
   markers:true,
   scrub:true,
  },
  y:400,
  stagger:0.5,
  ease: "power3.out",
  opacity:0,
})

// sec22 --------

gsap.from(".sec22_title", {
  scrollTrigger:
   {trigger: "#sec22",
   start: "-500 top",
   end:'1000 bottom',
   pin:false,
   markers:true,
   scrub:true,
  },
  // y:50,
  opacity:0,
})

gsap.from(".sec22_mock_up_con > img", {
  scrollTrigger:
   {trigger: "#sec22",
   start: "-200 top",
   end:'bottom bottom',
   pin:false,
   markers:true,
   scrub:true,
  },
  // y:50,
  stagger:0.2,
  opacity:0
})

gsap.from(".sec22_icon >img", {
  scrollTrigger:
   {trigger: "#sec22",
   start: "top top",
   end:'500 bottom',
   pin:false,
   markers:true,
   scrub:true,
  },
  ease:"ease",
  scale:0,
  stagger:0.2
})

// sec23 --------

gsap.from(".sec23_title", {
  scrollTrigger:
   {trigger: "#sec23",
   start: "-500 top",
   end:'1000 bottom',
   pin:false,
   markers:true,
   scrub:true,
  },
  // y:50,
  opacity:0,
})

gsap.from(".sec23_watch_list > li", {
  scrollTrigger:
   {trigger: "#sec23",
   start: "top top",
   end:'bottom bottom',
   pin:false,
   markers:true,
   scrub:true,
  },
  y:50,
  stagger:0.2,
  opacity:0
})

gsap.from(".sec23_no_list > li", {
  scrollTrigger:
   {trigger: "#sec23",
   start: "top top",
   end:'bottom bottom',
   pin:false,
   markers:true,
   scrub:true,
  },
  // y:50,
  stagger:0.2,
  opacity:0,
  duration:1
})

gsap.from(".sec23_text_list > li", {
  scrollTrigger:
   {trigger: "#sec23",
   start: "200 top",
   end:'bottom bottom',
   pin:false,
   markers:true,
   scrub:true,
  },
  // y:50,
  stagger:0.2,
  opacity:0,
  duration:2
})


  // gsap.from(".sec23_hand01", {
  //   scrollTrigger:
  //    {trigger: "#sec23",
  //    start: "top top",
  //    end:'bottom bottom',
  //    pin:false,
  //    markers:true,
  //    scrub:false,
  //    toggleActions:restart
  //   },
  //   // x:"-5760.44px"
  //   x:"140px",
  //   ease: "power4.out",
  //   duration:1.2,
    

  // })

  // gsap.from(".sec23_mock_up", {
  //   scrollTrigger:
  //    {trigger: "#sec23",
  //    start: "-500 top",
  //    end:'2000 bottom',
  //    pin:false,
  //    markers:true,
  //    scrub:2,
  //   },
  //   rotateY:40

  // })

//sec24 --------------

gsap.from(".sec24_title", {
  scrollTrigger:
   {trigger: "#sec24",
   start: "200 top",
   end:'bottom bottom',
   pin:false,
   markers:true,
  //  scrub:true,
  },
  // y:50,
  opacity:0,
})

gsap.from(".sec24_btn", {
  scrollTrigger:
   {trigger: "#sec24",
   start: "200 top",
   end:'bottom bottom',
   pin:false,
   markers:true,
  //  scrub:true,
  },
  // y:50,
  opacity:0,
})

gsap.from(".sec24_mock_up_list >li", {
  scrollTrigger:
   {trigger: "#sec24",
   start: "-200 top",
   end:'bottom bottom',
   pin:false,
   markers:true,
   scrub:true,
  },
  y:-50,
  stagger:0.3,
  ease: "power1.out",
  // opacity:0,
})

gsap.from(".sec24_coin_list >li", {
  scrollTrigger:
   {trigger: "#sec24",
   start: "-200 top",
   end:'bottom bottom',
   pin:false,
   markers:true,
   scrub:true,
  },
  y:50,
  stagger:0.8,
  ease: "power1.out",
  // opacity:0,
})


  /* scroll event section */
  // $(window).scroll(function () {
  //   var scrollTop = $(window).scrollTop();
  //   $(".posNum").text(scrollTop);
  container.addListener((e) => {
    let scrollTop = container.scrollTop;
    $(".posNum").html(scrollTop);

    if(scrollTop >= 0 && scrollTop  < 5000){
      $('.color_line').css({left:0 + "px"})
      $('.nav >ul >li').removeClass('on')
      $('.nav >ul >li:nth-child(1)').addClass('on')

    }

    if(scrollTop >= 5000 && scrollTop  < 10000){
      $('.color_line').css({left:100 + "px"})
      $('.nav >ul >li').removeClass('on')
      $('.nav >ul >li:nth-child(2)').addClass('on')
    }
    if(scrollTop >= 10000 && scrollTop < 15000){
      $('.color_line').css({left:200 + "px"})
      $('.nav >ul >li').removeClass('on')
      $('.nav >ul >li:nth-child(3)').addClass('on')
    }

    if(scrollTop >= 15000 && scrollTop < 20000){
      $('.color_line').css({left:300 + "px"})
      $('.nav >ul >li').removeClass('on')
      $('.nav >ul >li:nth-child(4)').addClass('on')
    }





if(scrollTop> 4982){
  $('.sec02_line_02').addClass('on')
  

}else{
  $('.sec02_line_02').removeClass('on')
}


if(scrollTop> 38602){
  $('.sec03_arrow').addClass('on')
  $('.sec03_conclusion').addClass('on')

}else{
  $('.sec03_arrow').removeClass('on')
  $('.sec03_conclusion').removeClass('on')
}


if(scrollTop> 52589){
  $('.sec09_mock_up_con').addClass('on')
  

}else{
  $('.sec09_mock_up_con').removeClass('on')
}

if(scrollTop >63602){

  $('.sec09_line_list>li').addClass('on')

}else{
 $('.sec09_line_list>li').removeClass('on')

}

if(scrollTop >57521){
  $('.sec11_mock_up').addClass('on')

}else{
  $('.sec11_mock_up').removeClass('on')
}



if(scrollTop >57500){
  $('.sec11_line >img').addClass('on')

}else{
  $('.sec11_line >img').removeClass('on')
}

if(scrollTop >59090){
  $('.sec12_line >img').addClass('on')
}else{
  $('.sec12_line >img').removeClass('on')
}

if(scrollTop >52000){
  $('.sec12_mock_up').addClass('on')
}else{
  $('.sec12_mock_up').removeClass('on')
}



if(scrollTop >56484){
  $('.sec10_line').addClass('on')
}else{
  $('.sec10_line').removeClass('on')
}


  });
})

















// function toggleClassAndScroll(start, end, className) {
//   if (scrollTop >= start && scrollTop < end) {
//     $(className).addClass('on');
//   } else {
//     $(className).removeClass('on');
//   }
// }
// toggleClassAndScroll(100, 200, '#');
// toggleClassAndScroll(300, 400, '.');
// toggleClassAndScroll(500, 600, '#');
// toggleClassAndScroll(700, 800, '.');