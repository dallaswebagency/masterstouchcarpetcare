(function(){
  var $=function(s,c){return (c||document).querySelector(s)};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

  var yr=$('#yr'); if(yr) yr.textContent=new Date().getFullYear();

  // Floating header becomes fixed on scroll
  var hdr=$('#hdr'), shell=$('.hdr-shell');
  if(hdr&&shell){
    shell.style.minHeight=shell.offsetHeight+'px';
    addEventListener('scroll',function(){hdr.classList.toggle('fixed',scrollY>260)},{passive:true});
  }

  // Mobile menu
  var bg=$('#burger');
  if(bg&&hdr){
    bg.addEventListener('click',function(){hdr.classList.toggle('open')});
    $$('#nav a').forEach(function(a){a.addEventListener('click',function(){if(!a.classList.contains('dd-toggle'))hdr.classList.remove('open')})});
    var nav=$('#nav'); if(nav) nav.addEventListener('click',function(e){if(e.target===nav)hdr.classList.remove('open')});
  }
  // Services dropdown toggle on touch/mobile
  $$('.dd-toggle').forEach(function(t){
    t.addEventListener('click',function(e){
      if(innerWidth<=980){e.preventDefault();t.parentNode.classList.toggle('dd-open')}
    });
  });

  // Reveal on scroll
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});
    $$('.rv').forEach(function(el){io.observe(el)});
  } else { $$('.rv').forEach(function(el){el.classList.add('in')}); }

  // FAQ accordion
  $$('.acc').forEach(function(acc){
    var ans=$('.ans',acc);
    if(acc.classList.contains('open'))ans.style.maxHeight=ans.scrollHeight+'px';
    $('button',acc).addEventListener('click',function(){
      var was=acc.classList.contains('open');
      $$('.acc',acc.parentNode).forEach(function(o){o.classList.remove('open');$('.ans',o).style.maxHeight=null});
      if(!was){acc.classList.add('open');ans.style.maxHeight=ans.scrollHeight+'px'}
    });
  });

  // Process tabs
  $$('.tabs').forEach(function(box){
    var btns=$$('.tab-btns button',box), panes=$$('.tab-pane',box);
    btns.forEach(function(b,i){b.addEventListener('click',function(){
      btns.forEach(function(x){x.classList.remove('on')});panes.forEach(function(p){p.classList.remove('on')});
      b.classList.add('on');panes[i].classList.add('on');
    })});
  });

  // Reviews marquee
  var R=[
   ["When we need our carpet or couch cleaned, we only use Masters Touch! Dennis and Gretchen are amazing and booking is so easy! Always makes it brand new!!! Highly recommend","Hannah F."],
   ["Dennis did a great job cleaning our area rugs. He was prompt and efficient. Thank you so much, Master's Touch!","Barb M."],
   ["This is the second time I've had Dennis take care of carpet stretching needs in my home. He does a great job and is reasonably priced. The work is done professionally, and he is on time, efficient, and effective with his work. I would not call anyone else and would highly recommend.","Andy W."],
   ["We recently used Master's Touch carpet cleaning in our home. They did a great job and removed some older tough stains. This is an honest, hard working local business. We recommend them.","Gary and Lauralee C."],
   ["We had our carpet cleaned for the first time with them and I was impressed by the attention to detail and the friendliness shown. We've decided that they will be our go-to for our carpet cleaning services in the future. The price was very reasonable for what we had done. The carpets turned out much better than I was expecting since we have both a child and pet.","Chris B."]
  ];
  function card(r){
    var ini=r[1].split(' ').map(function(w){return w[0]}).filter(function(c){return /[A-Z]/.test(c)}).slice(0,2).join('');
    return '<article class="rc"><div class="st">★★★★★</div><p>'+r[0]+'</p><div class="who"><span class="av">'+ini+'</span><span><b>'+r[1]+'</b></span></div></article>';
  }
  function fill(el,arr){if(!el)return;var h=arr.map(card).join('');el.innerHTML=h+h}
  fill($('#m1'),R);
  fill($('#m2'),[R[3],R[1],R[4],R[0],R[2]]);

  // Estimate forms open a pre-filled email to the business
  $$('.est-form-js').forEach(function(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var f=new FormData(form);
      var body=['Name: '+f.get('name'),'Phone: '+f.get('phone'),'Email: '+f.get('email'),'City: '+f.get('city'),'Number of Rooms: '+f.get('rooms'),'Service Type: '+f.get('service'),'Preferred Contact Method: '+f.get('contact')].join('\n');
      location.href='mailto:gretchen@masterstouchcarpetcare.com?subject='+encodeURIComponent('Free Estimate Request: '+f.get('name'))+'&body='+encodeURIComponent(body);
    });
  });
})();
