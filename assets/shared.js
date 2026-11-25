/* ===== ZIVORA shared: product catalogue, Supabase connection, wishlist & cart.
   Loaded by every page (home, collection, product, about, contact, reviews) so the
   product data lives in exactly one file. window.ZV is set by each page before this
   script: root = prefix back to the site root for image paths, pages = prefix to the
   page files. ===== */
window.ZV=window.ZV||{root:"",pages:"assets/"};
var ZVROOT=window.ZV.root||"";
var ZVPAGES=(window.ZV.pages!=null?window.ZV.pages:"assets/");
function imgSrc(src){if(!src)return src; if(/^https?:\/\//.test(src)||src.indexOf("data:")===0)return src; return ZVROOT+src;}
function goProduct(id){window.location.href=ZVPAGES+"product.html?id="+id;}
function escHtml(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");}


/* Category correction: bags whose photos show long / tall handles or a
   long shoulder strap were filed under the simple Hand Bags category;
   by their photos they belong to Long Hand Bag — the three long-handle
   totes first, and now also the tall top-handle bags of the same type
   as the Bella Couture set (tall arched handles, ring handles, long
   straps). Only the two genuinely short-handle satchels (Chevron
   Top-Handle Satchel, Model 6185-10#) stay in Hand Bags. Shoulder Bag,
   Imported Bag, Backpack and the clutches are defined by their own
   carry style / origin, so they keep their categories. The built-in
   list below already carries the corrected categories; this map also
   corrects every product loaded from Supabase, whose saved rows may
   still hold the old category, so the fix shows on the live site
   without a re-sync. */
var SUB_FIX={"Everyday Tote":"Long Hand Bag","Monogram Shopper Tote":"Long Hand Bag","Zivora Chain-Handle Tote":"Long Hand Bag","Bella Couture 2-Piece Top-Handle Set":"Long Hand Bag","Heart-Lock Top-Handle Satchel":"Long Hand Bag","Ring-Handle Top-Handle Bag":"Long Hand Bag","Fashion Vanity Top-Handle Bag":"Long Hand Bag","Kiss-Lock Frame Top-Handle Bag":"Long Hand Bag","Ring-Handle Tassel Top-Handle Bag":"Long Hand Bag","Black & White Ring-Handle Top-Handle Bag":"Long Hand Bag","Marble Heart-Lock Top-Handle Bag":"Long Hand Bag","Zivora Striped Top-Handle Tote":"Long Hand Bag","Chevron-Strap Top-Handle Bag":"Long Hand Bag"};
var PRODUCTS=[
 {id:1,name:"Cherry Hobo Shoulder Bag",cat:"Purses",sub:"Shoulder Bag",price:3500,old:4549,img:"assets/products/p01-1.jpg",gallery:["assets/products/p01-1.jpg","assets/products/p01-2.jpg","assets/products/p01-3.jpg","assets/products/p01-4.jpg","assets/products/p01-5.jpg","assets/products/p01-6.jpg","assets/products/p01-7.jpg"],colours:["Brown","Black","Pink","Lavender","Wine","Mint","Cream","Grey"],badge:"Bestseller",desc:"Soft suede-like hobo with a long shoulder strap, gold centre stripe and a cherry charm."},
 {id:2,name:"Cherry Flap Shoulder Bag",cat:"Purses",sub:"Shoulder Bag",price:3800,old:4949,img:"assets/products/p02-1.jpg",gallery:["assets/products/p02-1.jpg","assets/products/p02-2.jpg","assets/products/p02-3.jpg","assets/products/p02-4.jpg","assets/products/p02-5.jpg","assets/products/p02-6.jpg","assets/products/p02-7.jpg","assets/products/p02-8.jpg","assets/products/p02-9.jpg"],colours:["White","Black","Pink","Brown","Burgundy","Mint","Blue","Lavender","Light Blue"],badge:"New",desc:"Smooth leather flap shoulder bag with a gold lock clasp and cherry charm."},
 {id:3,name:"Fashion Chain Crossbody",cat:"Purses",sub:"Shoulder Bag",price:3500,old:4549,img:"assets/products/p03-1.jpg",gallery:["assets/products/p03-1.jpg","assets/products/p03-2.jpg"],colours:["Pink","Beige"],badge:"Loved",desc:"Flap crossbody with a chunky chain and a wide woven patterned shoulder strap."},
 {id:4,name:"Cherry Crossbody Bag",cat:"Purses",sub:"Shoulder Bag",price:3500,old:4549,img:"assets/products/p04-1.jpg",gallery:["assets/products/p04-1.jpg"],colours:["Beige"],badge:"Signature",desc:"Beige flap crossbody with \'Cherry\' script, a cherry charm and a wide zigzag strap."},
 {id:5,name:"Zivora Hobo Shoulder Bag",cat:"Purses",sub:"Shoulder Bag",price:3500,old:4549,img:"assets/products/p05-1.jpg",gallery:["assets/products/p05-1.jpg"],colours:["Cream"],badge:"Iconic",desc:"Cream textured hobo with long shoulder handles and a front pocket."},
 {id:6,name:"Chevron Top-Handle Satchel",cat:"Purses",sub:"Hand Bags",price:4500,old:5849,img:"assets/products/p06-1.jpg",gallery:["assets/products/p06-1.jpg","assets/products/p06-2.jpg"],colours:["Pink","Beige"],badge:"Everyday",desc:"Top-handle satchel with silver chevron straps and a matching mini pouch."},
 {id:7,name:"Heart-Lock Top-Handle Satchel",cat:"Purses",sub:"Long Hand Bag",price:4500,old:5849,img:"assets/products/p07-1.jpg",gallery:["assets/products/p07-1.jpg","assets/products/p07-2.jpg"],colours:["Pink","Mint"],badge:"Limited",desc:"Woven-texture satchel with a top handle, shoulder strap and heart lock charm."},
 {id:8,name:"Ring-Handle Top-Handle Bag",cat:"Purses",sub:"Long Hand Bag",price:4500,old:5849,img:"assets/products/p08-1.jpg",gallery:["assets/products/p08-1.jpg","assets/products/p08-2.jpg"],colours:["Green","Pink"],badge:"Bestseller",desc:"Top-handle bag with a bold metal ring handle and white contrast straps."},
 {id:9,name:"Fashion Vanity Top-Handle Bag",cat:"Purses",sub:"Long Hand Bag",price:4200,old:5449,img:"assets/products/p09-1.jpg",gallery:["assets/products/p09-1.jpg","assets/products/p09-2.jpg"],colours:["Pink","Brown"],badge:"New",desc:"Structured vanity-style handbag with \'Fashion\' script and a front zip pocket."},
 {id:10,name:"Bella Couture 2-Piece Top-Handle Set",cat:"Purses",sub:"Long Hand Bag",price:5500,old:7149,img:"assets/products/p10-1.jpg",gallery:["assets/products/p10-1.jpg","assets/products/p10-2.jpg","assets/products/p10-3.jpg"],colours:["Brown","Lavender","Cream"],badge:"Loved",desc:"Two-piece top-handle set with gold locks and a matching mini bag."},
 {id:11,name:"Kiss-Lock Frame Top-Handle Bag",cat:"Purses",sub:"Long Hand Bag",price:5000,old:6499,img:"assets/products/p11-1.jpg",gallery:["assets/products/p11-1.jpg","assets/products/p11-2.jpg","assets/products/p11-3.jpg"],colours:["Mint","Cream","Grey"],badge:"Signature",desc:"Elegant kiss-lock frame bag with a pearl clasp and gold trim."},
 {id:12,name:"Ring-Handle Tassel Top-Handle Bag",cat:"Purses",sub:"Long Hand Bag",price:4500,old:5849,img:"assets/products/p12-1.jpg",gallery:["assets/products/p12-1.jpg"],colours:["Pink"],badge:"Iconic",desc:"Pink top-handle bag with gold ring handles and a tassel charm."},
 {id:13,name:"Black & White Ring-Handle Top-Handle Bag",cat:"Purses",sub:"Long Hand Bag",price:4500,old:5849,img:"assets/products/p13-1.jpg",gallery:["assets/products/p13-1.jpg"],colours:["Black","White"],badge:"Everyday",desc:"Black marble-finish top-handle bag with gold ring handles and white side panels."},
 {id:14,name:"Marble Heart-Lock Top-Handle Bag",cat:"Purses",sub:"Long Hand Bag",price:4800,old:6249,img:"assets/products/p14-1.jpg",gallery:["assets/products/p14-1.jpg"],colours:["Pink"],badge:"Limited",desc:"Pink marble-finish top-handle bag with a heart lock and shoulder strap."},
 {id:15,name:"Zivora Striped Top-Handle Tote",cat:"Purses",sub:"Long Hand Bag",price:4500,old:5849,img:"assets/products/p15-1.jpg",gallery:["assets/products/p15-1.jpg"],colours:["Beige"],badge:"Bestseller",desc:"Beige striped tote with top handles and a front zip pocket."},
 {id:16,name:"Everyday Tote",cat:"Purses",sub:"Long Hand Bag",price:3800,old:4949,img:"assets/products/p16-1.jpg",gallery:["assets/products/p16-1.jpg"],colours:["Navy Blue"],badge:"New",desc:"Plain spacious navy tote with long handles for daily use."},
 {id:17,name:"Monogram Shopper Tote",cat:"Purses",sub:"Long Hand Bag",price:4200,old:5449,img:"assets/products/p17-1.jpg",gallery:["assets/products/p17-1.jpg"],colours:["Burgundy","White"],badge:"Loved",desc:"Burgundy and white monogram shopper tote with long handles."},
 {id:18,name:"Zivora Chain-Handle Tote",cat:"Purses",sub:"Long Hand Bag",price:4200,old:5449,img:"assets/products/p18-1.jpg",gallery:["assets/products/p18-1.jpg"],colours:["Black"],badge:"Signature",desc:"Black textured tote with chain-link handles and a Zivora plaque."},
 {id:19,name:"Model 6185-10# Top-Handle Satchel",cat:"Purses",sub:"Hand Bags",price:4500,old:5849,img:"assets/products/p19-1.jpg",gallery:["assets/products/p19-1.jpg","assets/products/p19-2.jpg","assets/products/p19-3.jpg","assets/products/p19-4.jpg"],colours:["Dark Brown","Brown","Black","Light Grey","Khaki","Cream","Pink"],badge:"Iconic",desc:"Compact top-handle satchel (21x13 cm) with silver buckle straps and a shoulder strap."},
 {id:20,name:"Chevron-Strap Top-Handle Bag",cat:"Purses",sub:"Long Hand Bag",price:4500,old:5849,img:"assets/products/p20-1.jpg",gallery:["assets/products/p20-1.jpg"],colours:["Cream"],badge:"Everyday",desc:"Cream embossed top-handle bag with black and silver chevron straps."},
 {id:21,name:"Fashion Long Flap Clutch",cat:"Purses",sub:"Casual Clutch",price:2800,old:3649,img:"assets/products/p21-1.jpg",gallery:["assets/products/p21-1.jpg","assets/products/p21-2.jpg"],colours:["Pink","Grey"],badge:"Limited",desc:"Long flat flap clutch with \'Fashion\' script and a lock clasp."},
 {id:22,name:"Baellerry Wristlet Wallet",cat:"Purses",sub:"Casual Clutch",price:2500,old:3249,img:"assets/products/p22-1.jpg",gallery:["assets/products/p22-1.jpg"],colours:["Brown","Black"],badge:"Bestseller",desc:"Long zip wristlet wallet in brown and black with a wrist strap."},
 {id:23,name:"Always Lucky Checkered Zip Wallet",cat:"Purses",sub:"Casual Clutch",price:2200,old:2849,img:"assets/products/p23-1.jpg",gallery:["assets/products/p23-1.jpg","assets/products/p23-2.jpg"],colours:["Pink","Blue"],badge:"New",desc:"Checkered zip-around wallet with a snap strap, in pink and blue."},
 {id:24,name:"Fashion Wristlet Clutch",cat:"Purses",sub:"Casual Clutch",price:2500,old:3249,img:"assets/products/p24-1.jpg",gallery:["assets/products/p24-1.jpg","assets/products/p24-2.jpg"],colours:["Magenta","Navy Blue"],badge:"Loved",desc:"Envelope wristlet clutch with \'Fashion\' script and a wrist strap."},
 {id:25,name:"Fashion Flap Clutch",cat:"Purses",sub:"Casual Clutch",price:2500,old:3249,img:"assets/products/p25-1.jpg",gallery:["assets/products/p25-1.jpg","assets/products/p25-2.jpg"],colours:["Pink","Mint"],badge:"Signature",desc:"Flat flap clutch with \'Fashion\' script and a lock clasp."},
 {id:26,name:"Leather Mini Backpack",cat:"Purses",sub:"Backpack",price:4500,old:5849,img:"assets/products/p26-1.jpg",gallery:["assets/products/p26-1.jpg","assets/products/p26-2.jpg"],colours:["Mint","Pink"],badge:"Iconic",desc:"Compact leather backpack with front zip pockets and a matching mini pouch."},
 {id:27,name:"Star Print Kids Backpack",cat:"Purses",sub:"Backpack",price:3000,old:3899,img:"assets/products/p27-1.jpg",gallery:["assets/products/p27-1.jpg"],colours:["Pink"],badge:"Everyday",desc:"Pink star-print backpack with a pom-pom charm, made for kids."},
 {id:28,name:"Floral Quilted Backpack",cat:"Purses",sub:"Backpack",price:4000,old:5199,img:"assets/products/p28-1.jpg",gallery:["assets/products/p28-1.jpg","assets/products/p28-2.jpg"],colours:["Blue","Cream"],badge:"Limited",desc:"Quilted floral backpack with front pockets and a matching pouch."},
 {id:29,name:"Everyday Canvas Backpack",cat:"Purses",sub:"Backpack",price:3500,old:4549,img:"assets/products/p29-1.jpg",gallery:["assets/products/p29-1.jpg"],colours:["Beige"],badge:"Bestseller",desc:"Plain beige canvas backpack with front zip pockets."},
 {id:30,name:"Pom-Pom Charm Backpack",cat:"Purses",sub:"Backpack",price:3800,old:4949,img:"assets/products/p30-1.jpg",gallery:["assets/products/p30-1.jpg"],colours:["Light Grey"],badge:"New",desc:"Light grey backpack with a pearl and fur pom-pom charm."},
 {id:31,name:"Gucci Tassel Crossbody",cat:"Purses",sub:"Imported Bag",price:6500,old:8449,img:"assets/products/p31-1.jpg",gallery:["assets/products/p31-1.jpg"],colours:["Navy Blue"],badge:"Loved",desc:"Navy crossbody with a Gucci logo, tassels and a wide patterned strap."},
 {id:32,name:"Michael Kors Heart-Lock Crossbody",cat:"Purses",sub:"Imported Bag",price:6000,old:7799,img:"assets/products/p32-1.jpg",gallery:["assets/products/p32-1.jpg","assets/products/p32-2.jpg"],colours:["Pink","Black"],badge:"Signature",desc:"Crossbody with Michael Kors lettering, a heart lock-key charm and a wide strap."},
 {id:33,name:"Miu Miu-Style Logo Crossbody",cat:"Purses",sub:"Imported Bag",price:6000,old:7799,img:"assets/products/p33-1.jpg",gallery:["assets/products/p33-1.jpg"],colours:["Green"],badge:"Iconic",desc:"Green crossbody with a gold designer-style logo plaque and a wide strap."},
 {id:34,name:"Fendi Monogram Top-Handle Tote",cat:"Purses",sub:"Imported Bag",price:6500,old:8449,img:"assets/products/p34-1.jpg",gallery:["assets/products/p34-1.jpg"],colours:["Navy Blue"],badge:"Everyday",desc:"Navy monogram tote with tan handles and a Fendi logo plaque."},
 {id:35,name:"Dior Top-Handle Bag",cat:"Purses",sub:"Imported Bag",price:7000,old:9099,img:"assets/products/p35-1.jpg",gallery:["assets/products/p35-1.jpg"],colours:["Cream"],badge:"Limited",desc:"Cream top-handle bag with a black Dior logo plaque."},
 {id:36,name:"Coach Top-Handle Bag",cat:"Purses",sub:"Imported Bag",price:6500,old:8449,img:"assets/products/p36-1.jpg",gallery:["assets/products/p36-1.jpg"],colours:["Cream"],badge:"Bestseller",desc:"Cream top-handle bag with a gold Coach logo plaque and heart charms."},
 {id:37,name:"Christian Dior 2-Piece Top-Handle Set",cat:"Purses",sub:"Imported Bag",price:7000,old:9099,img:"assets/products/p37-1.jpg",gallery:["assets/products/p37-1.jpg","assets/products/p37-2.jpg","assets/products/p37-3.jpg","assets/products/p37-4.jpg","assets/products/p37-5.jpg"],colours:["Dusty Pink","Tan","Beige","Taupe","Pink Floral"],badge:"New",desc:"Top-handle bag with a matching mini pouch, Christian Dior branding and a hang tag."},
 {id:38,name:"Dior Monogram Top-Handle Tote",cat:"Purses",sub:"Imported Bag",price:6500,old:8449,img:"assets/products/p38-1.jpg",gallery:["assets/products/p38-1.jpg"],colours:["Yellow"],badge:"Loved",desc:"Yellow monogram tote with Dior plaques and top handles."},
 {id:39,name:"Zara Cherry Top-Handle Bag",cat:"Purses",sub:"Imported Bag",price:5500,old:7149,img:"assets/products/p39-1.jpg",gallery:["assets/products/p39-1.jpg"],colours:["Green"],badge:"Signature",desc:"Green top-handle bag with a Zara plaque and a cherry charm."},
 {id:40,name:"Chanel CC Top-Handle Bag",cat:"Purses",sub:"Imported Bag",price:7000,old:9099,img:"assets/products/p40-1.jpg",gallery:["assets/products/p40-1.jpg","assets/products/p40-2.jpg"],colours:["Beige","Brown"],badge:"Iconic",desc:"Top-handle bag with a gold Chanel-style CC logo and a Bella Couture tag."},
 {id:41,name:"Dior Checkered Top-Handle Bag",cat:"Purses",sub:"Imported Bag",price:6500,old:8449,img:"assets/products/p41-1.jpg",gallery:["assets/products/p41-1.jpg"],colours:["White","Black","Pink"],badge:"Everyday",desc:"White, black and pink checkered top-handle bag with Dior plaques."},
 {id:42,name:"Louis Vuitton Top-Handle Tote",cat:"Purses",sub:"Imported Bag",price:7000,old:9099,img:"assets/products/p42-1.jpg",gallery:["assets/products/p42-1.jpg"],colours:["Burgundy"],badge:"Limited",desc:"Burgundy top-handle tote with a Louis Vuitton logo plaque and a front zip pocket."},
 {id:43,name:"Braun Buffel Top-Handle Tote",cat:"Purses",sub:"Imported Bag",price:6000,old:7799,img:"assets/products/p43-1.jpg",gallery:["assets/products/p43-1.jpg"],colours:["Mint"],badge:"Bestseller",desc:"Mint woven top-handle tote with a Braun Buffel logo plaque."},
 {id:44,name:"Christian Dior Hobo Shoulder Bag",cat:"Purses",sub:"Imported Bag",price:6500,old:8449,img:"assets/products/p44-1.jpg",gallery:["assets/products/p44-1.jpg"],colours:["Cream"],badge:"New",desc:"Cream hobo shoulder bag with Christian Dior lettering."},
 {id:45,name:"Miu Miu-Style \'min\' Top-Handle Bag",cat:"Purses",sub:"Imported Bag",price:6000,old:7799,img:"assets/products/p45-1.jpg",gallery:["assets/products/p45-1.jpg"],colours:["Burgundy"],badge:"Loved",desc:"Burgundy top-handle bag with a \'min\' logo plaque and a mini bag charm."},
 {id:46,name:"Dior Monogram Box Bag",cat:"Purses",sub:"Imported Bag",price:7000,old:9099,img:"assets/products/p46-1.jpg",gallery:["assets/products/p46-1.jpg"],colours:["Grey"],badge:"Signature",desc:"Grey Dior monogram box bag with a gold chain strap, held in hand."},
 {id:47,name:"Louis Vuitton Top-Handle Set",cat:"Purses",sub:"Imported Bag",price:7500,old:9749,img:"assets/products/p47-1.jpg",gallery:["assets/products/p47-1.jpg"],colours:["Brown"],badge:"Iconic",desc:"Brown LV top-handle bag with chain handles and a matching wallet."},
 {id:48,name:"Fongiazz Croc Top-Handle Bag",cat:"Purses",sub:"Imported Bag",price:6500,old:8449,img:"assets/products/p48-1.jpg",gallery:["assets/products/p48-1.jpg"],colours:["White","Black"],badge:"Everyday",desc:"Croc-texture top-handle bag with gold hardware, in white and black."},
 {id:49,name:"YSL Lace Top-Handle Bag",cat:"Purses",sub:"Imported Bag",price:7000,old:9099,img:"assets/products/p49-1.jpg",gallery:["assets/products/p49-1.jpg","assets/products/p49-2.jpg"],colours:["Pink","Light Blue"],badge:"Limited",desc:"Lace-texture top-handle bag with a black YSL logo and a shoulder strap."},
 {id:50,name:"Peacock Crystal Bridal Clutch",cat:"Purses",sub:"Bridal Clutch",price:7500,old:9749,img:"assets/products/p50-1.jpg",gallery:["assets/products/p50-1.jpg","assets/products/p50-2.jpg"],colours:["Black","Silver"],badge:"Bestseller",desc:"Velvet clutch with a crystal peacock motif and a chain strap."},
 {id:51,name:"Crystal Buckle Glitter Bridal Clutch",cat:"Purses",sub:"Bridal Clutch",price:7000,old:9099,img:"assets/products/p51-1.jpg",gallery:["assets/products/p51-1.jpg"],colours:["Silver"],badge:"New",desc:"Silver glitter clutch with a crystal buckle and a pearl-drop chain."},
 {id:52,name:"Ring-Clasp Glitter Bridal Clutch",cat:"Purses",sub:"Bridal Clutch",price:7000,old:9099,img:"assets/products/p52-1.jpg",gallery:["assets/products/p52-1.jpg"],colours:["Silver"],badge:"Loved",desc:"Silver glitter clutch with a crystal ring clasp and a gold chain."},
 {id:53,name:"Butterfly Crystal Bridal Clutch",cat:"Purses",sub:"Bridal Clutch",price:8000,old:10399,img:"assets/products/p53-1.jpg",gallery:["assets/products/p53-1.jpg","assets/products/p53-2.jpg"],colours:["Burgundy","Gold"],badge:"Signature",desc:"Velvet and mesh clutch with a crystal butterfly clasp and a jewelled handle."},
 {id:54,name:"Gold Rhinestone Pearl-Clasp Bridal Clutch",cat:"Purses",sub:"Bridal Clutch",price:7500,old:9749,img:"assets/products/p54-1.jpg",gallery:["assets/products/p54-1.jpg"],colours:["Gold"],badge:"Iconic",desc:"Gold rhinestone clutch with a pearl clasp and a gold ring handle."},
 {id:55,name:"Heart Rhinestone Bridal Clutch",cat:"Purses",sub:"Bridal Clutch",price:7000,old:9099,img:"assets/products/p55-1.jpg",gallery:["assets/products/p55-1.jpg","assets/products/p55-2.jpg"],colours:["Gold","Silver"],badge:"Everyday",desc:"Heart-shaped rhinestone clutch with a pearl-drop chain."},
 {id:56,name:"Gold Monogram Heart Clutch",cat:"Purses",sub:"Bridal Clutch",price:7000,old:9099,img:"assets/products/p56-1.jpg",gallery:["assets/products/p56-1.jpg"],colours:["Gold"],badge:"Limited",desc:"Gold monogram heart-shaped clutch with a pearl chain strap."},
];
/* ================= SUPABASE CONNECTION ================= */
var SUPABASE_URL="https://bzazkomaxxvdqryosrue.supabase.co";
var SUPABASE_ANON="sb_publishable_TpJvfBmeW7_Teq8H_WhZ8A_Pm_Ea89H";
var SB_SOURCE="Website (built-in)";
var sbOrdersCache=[];
var sbAdminToken=null; /* sirf memory mein — kabhi save nahi hota */
function sbHeaders(extra,useAdmin){var h={"apikey":SUPABASE_ANON,"Authorization":"Bearer "+((useAdmin&&sbAdminToken)?sbAdminToken:SUPABASE_ANON),"Content-Type":"application/json"};if(extra)for(var k in extra)h[k]=extra[k];return h;}
function sbRequest(path,opts){
  opts=opts||{};
  return fetch(SUPABASE_URL+"/rest/v1/"+path,{method:opts.method||"GET",headers:sbHeaders(opts.headers||null,opts.admin),body:opts.body?JSON.stringify(opts.body):undefined})
  .then(function(r){return r.text().then(function(t){var d=null;try{d=t?JSON.parse(t):null;}catch(e){}return{ok:r.ok,status:r.status,data:d,text:t};});})
  .catch(function(e){return{ok:false,status:0,data:null,text:String(e)};});
}
function setSbStatus(state,text){var d=document.getElementById('sbDot'),t=document.getElementById('sbStatusText');if(d)d.className="sb-dot "+(state||"");if(t&&text)t.textContent=text;}
function parseListField(v){if(!v)return[];if(Array.isArray(v))return v;if(typeof v==="string"){var s=v.trim();if(!s)return[];try{var j=JSON.parse(s);if(Array.isArray(j))return j;}catch(e){}return s.split(/[,\n]/).map(function(x){return x.trim();}).filter(Boolean);}return[];}
function normalizeRemote(r){
  var price=Number(r.price||0);
  var img=r.img||r.image_url||r.image||r.photo_url||r.thumbnail||"";
  var gallery=parseListField(r.gallery||r.images||r.photos); if(!gallery.length&&img)gallery=[img];
  var colours=parseListField(r.colours||r.colors||r.colour||r.color);
  return{id:(typeof r.id==="number"?r.id:null),remoteId:r.id,remote:true,name:r.name||r.title||"Untitled Bag",cat:r.cat||"Purses",sub:(SUB_FIX[r.name||r.title]||r.sub||r.category||r.sub_category||"Hand Bags"),price:price,old:Number((r.old_price!==undefined&&r.old_price!==null)?r.old_price:((r.old!==undefined&&r.old!==null)?r.old:Math.round(price*1.3))),img:img,gallery:gallery,colours:colours,badge:r.badge||"New",desc:r.desc||r.description||""};
}
function activeFilter(){var b=document.querySelector('.filter-btn.active');return b?b.dataset.filter:"All";}
var SB_SQL_FIX="alter table public.products enable row level security;\nalter table public.orders enable row level security;\ngrant select on public.products to anon;\ngrant insert on public.orders to anon;\ngrant select, insert, update, delete on public.products to authenticated;\ngrant select, update on public.orders to authenticated;\ngrant usage, select on all sequences in schema public to anon, authenticated;\ndrop policy if exists \"zivora products public read\" on public.products;\ncreate policy \"zivora products public read\" on public.products for select to anon, authenticated using (true);\ndrop policy if exists \"zivora products owner manage\" on public.products;\ncreate policy \"zivora products owner manage\" on public.products for all to authenticated using (true) with check (true);\ndrop policy if exists \"zivora orders public insert\" on public.orders;\ncreate policy \"zivora orders public insert\" on public.orders for insert to anon, authenticated with check (true);\ndrop policy if exists \"zivora orders owner read\" on public.orders;\ncreate policy \"zivora orders owner read\" on public.orders for select to authenticated using (true);\ndrop policy if exists \"zivora orders owner update\" on public.orders;\ncreate policy \"zivora orders owner update\" on public.orders for update to authenticated using (true) with check (true);\nalter table public.orders add column if not exists email text;";
function copySbSql(btn){if(navigator.clipboard)navigator.clipboard.writeText(SB_SQL_FIX).then(function(){showToast("SQL copied — paste it into the Supabase SQL Editor");});else showToast("The SQL is in the box above — copy it and run it in Supabase");}
function showSbFix(show){var b=document.getElementById('sbFixBox');if(b)b.style.display=show?'block':'none';}
function loadRemoteProducts(manual){
  setSbStatus("","Supabase: connecting…");
  return sbRequest("products?select=*&order=id.asc").then(function(res){
    if(!res.ok){var perm=(res.status===401||res.status===403||(res.text&&res.text.indexOf("42501")!==-1));setSbStatus("err",perm?"Supabase: permission denied — run the SQL fix below":"Supabase: connection issue — showing website products");showSbFix(perm);if(manual)showToast(perm?"Permission denied — the SQL fix is in the Admin panel, please run it":"Products could not be loaded from Supabase — showing the built-in products");return false;}
    showSbFix(false);
    var rows=Array.isArray(res.data)?res.data:[];
    if(!rows.length){setSbStatus("ok","Supabase: connected · products table is empty");SB_SOURCE="Website (built-in)";if(window.updateAdminStats)updateAdminStats();if(manual)showToast("Supabase is connected, but the products table is empty — press Sync");return false;}
    /* Merge remote rows into the built-in catalogue BY NAME, keeping the
       built-in ids (1-56), photos and display order stable. Cart keys, View
       Details links and the product page all use the same stable ids, so the
       bag, the drawer and the checkout summary can never disagree with the
       catalogue, and no product page can flip to "not found" when Supabase
       loads. Admin price/description/badge edits win; photos stay the local
       files. Rows with no built-in match (new pieces added in Admin) are
       appended with stable 10000+ ids. */
    var remoteByName={};
    rows.forEach(function(r){var rp=normalizeRemote(r);remoteByName[rp.name]=rp;});
    var merged=[];
    PRODUCTS.forEach(function(base){
      var rp=remoteByName[base.name];
      if(rp){if(rp.price)base.price=rp.price;if(rp.old)base.old=rp.old;if(rp.desc)base.desc=rp.desc;if(rp.badge)base.badge=rp.badge;delete remoteByName[base.name];}
      merged.push(base);
    });
    var nextRemote=10000;
    Object.keys(remoteByName).forEach(function(n){var rp=remoteByName[n];if(rp.id===null||rp.id===undefined)rp.id=nextRemote++;merged.push(rp);});
    PRODUCTS=merged;
    SB_SOURCE="Supabase";
    setSbStatus("ok","Supabase: connected · "+PRODUCTS.length+" products live");
    renderProducts(activeFilter());updateCart();if(window.updateAdminStats)updateAdminStats();if(window.renderAdminProducts)renderAdminProducts();if(window.onProductsReady)window.onProductsReady();
    if(manual)showToast("Supabase products loaded ✦ "+PRODUCTS.length+" products");
    return true;
  });
}
function productPayloadVariants(p){
  return [
    {name:p.name,category:p.sub,price:p.price,old_price:p.old,image_url:p.img,description:p.desc,badge:p.badge,colours:p.colours,gallery:p.gallery},
    {name:p.name,sub:p.sub,cat:p.cat||"Purses",price:p.price,old:p.old,img:p.img,desc:p.desc,badge:p.badge,colours:p.colours,gallery:p.gallery},
    {name:p.name,category:p.sub,price:p.price,image_url:p.img,description:p.desc},
    {name:p.name,price:p.price}
  ];
}
function tryProductWrite(p,isNew){
  var variants=productPayloadVariants(p);var idx=0;
  function attempt(){
    if(idx>=variants.length)return Promise.resolve({ok:false,text:"No payload variant accepted"});
    var body=variants[idx++];
    var path=isNew?"products":("products?id=eq."+encodeURIComponent(p.remoteId));
    var method=isNew?"POST":"PATCH";
    return sbRequest(path,{method:method,admin:true,headers:{"Prefer":"return=representation"},body:body}).then(function(res){
      if(res.ok)return res;
      if(res.status===400||res.status===422||res.status===404)return attempt();
      return res;
    });
  }
  return attempt();
}
function saveOrderRemote(order){
  var withEmail=[
    {order_no:order.order_no,customer_name:order.name,email:order.email,phone:order.phone,address:order.address,city:order.city,payment_method:order.pay,notes:order.notes,items:order.items,subtotal:order.subtotal,delivery_fee:order.delivery,total:order.total,status:"Pending"},
    {order_no:order.order_no,name:order.name,email:order.email,phone:order.phone,address:order.address,city:order.city,pay:order.pay,notes:order.notes,items:order.items,total:order.total,status:"Pending"}
  ];
  var noEmail=[
    {order_no:order.order_no,customer_name:order.name,phone:order.phone,address:order.address,city:order.city,payment_method:order.pay,notes:order.notes,items:order.items,subtotal:order.subtotal,delivery_fee:order.delivery,total:order.total,status:"Pending"},
    {order_no:order.order_no,name:order.name,phone:order.phone,address:order.address,city:order.city,pay:order.pay,notes:order.notes,items:order.items,total:order.total,status:"Pending"},
    {customer_name:order.name,phone:order.phone,address:order.address,city:order.city,items:order.items,total:order.total,status:"Pending"},
    {name:order.name,phone:order.phone,total:order.total,status:"Pending"}
  ];
  var variants=withEmail.concat(noEmail);
  var idx=0;
  function attempt(){
    if(idx>=variants.length)return Promise.resolve(false);
    return sbRequest("orders",{method:"POST",headers:{"Prefer":"return=representation"},body:variants[idx++]}).then(function(res){return res.ok?true:attempt();});
  }
  return attempt();
}
/* ================= END SUPABASE ================= */

var cart={}, wishlist={};
function fmt(n){return "PKR "+n.toLocaleString("en-PK");}
function prod(id){for(var i=0;i<PRODUCTS.length;i++)if(PRODUCTS[i].id===id)return PRODUCTS[i];}

var COLORMAP={"Brown":"#7a4a2b","Dark Brown":"#4a2c1a","Black":"#1d1d1d","Pink":"#e79bb4","Dusty Pink":"#d3a0a8","Pink Floral":"#e5a7b8","Lavender":"#c3b2dd","Wine":"#722f37","Mint":"#a8d8c0","Cream":"#f1e6cf","Grey":"#9a9a9a","Light Grey":"#cfcfcf","White":"#f5f5f5","Burgundy":"#5e1428","Blue":"#5b7fb4","Light Blue":"#a9cbe8","Beige":"#d9c29a","Green":"#4e7a51","Silver":"#c9ccd1","Gold":"#c9a227","Navy Blue":"#232c4f","Magenta":"#b0307c","Khaki":"#b3a284","Tan":"#c69a6b","Taupe":"#a08b7d","Yellow":"#e8c832"};
function colourDots(p){
  if(!p.colours||!p.colours.length)return "";
  var h='<div class="colours">';
  p.colours.forEach(function(c){h+='<i class="cdot" style="background:'+(COLORMAP[c]||'#ccc')+'" title="'+escHtml(c)+'"></i>';});
  h+='<span>'+p.colours.map(function(c){return escHtml(c);}).join(", ")+'</span></div>';
  return h;
}

/* cart + wishlist live in sessionStorage so the same bag follows the visitor
   across the separate pages of the site (cleared when the tab closes) */
try{var _sc=sessionStorage.getItem("zivora_cart"); if(_sc)cart=JSON.parse(_sc)||{}; var _sw=sessionStorage.getItem("zivora_wish"); if(_sw)wishlist=JSON.parse(_sw)||{};}catch(e){}
function saveCart(){try{sessionStorage.setItem("zivora_cart",JSON.stringify(cart));}catch(e){}}
function saveWish(){try{sessionStorage.setItem("zivora_wish",JSON.stringify(wishlist));}catch(e){}}

/* pages other than the homepage get the shared cart drawer and toast injected.
   Checkout is NOT a popup: it is its own page (assets/checkout.html). */
var ZV_CHROME="<!-- CART -->\n<div class=\"overlay\" id=\"overlay\"></div>\n<aside class=\"drawer\" id=\"cartDrawer\" aria-label=\"Shopping cart\">\n  <div class=\"drawer-head\"><h3>Your Bag \ud83d\udc5c</h3><button class=\"x-btn\" id=\"cartCloseBtn\" aria-label=\"Close cart\">\u2715</button></div>\n  <div class=\"cart-items\" id=\"cartItems\"></div>\n  <div class=\"cart-foot\" id=\"cartFoot\">\n    <div class=\"row\"><span>Subtotal</span><span id=\"subTotal\">PKR 0</span></div>\n    <div class=\"row\"><span>Delivery</span><span id=\"delFee\">PKR 0</span></div>\n    <div class=\"row total\"><span>Total</span><span id=\"grandTotal\">PKR 0</span></div>\n    <button class=\"btn btn-burgundy\" id=\"checkoutBtn\" style=\"width:100%;margin-top:.7rem\">Checkout \u00b7 Cash on Delivery</button>\n  </div>\n</aside>\n<div class=\"toast\" id=\"toast\" role=\"status\"></div>";
if(!document.getElementById('cartDrawer')){document.body.insertAdjacentHTML('beforeend',ZV_CHROME);}

/* ===== Slide-in side menu (hamburger).
   The button and menu markup are written directly into every page's HTML,
   so the hamburger always renders — even before this script runs or if it
   is served from cache. This code binds the open/close behaviour to that
   markup and only injects whatever is missing (older cached pages).
   Links are built from the page's own ZV prefixes (root / pages), so the
   same code points home from the root page and from the sub-pages. ===== */
(function(){
  function buildSideMenu(){
    var isHome=(ZVROOT==="");
    var homeHref=ZVROOT+"index.html";
    /* hamburger button — first item in the header nav, on every page */
    var nav=document.querySelector('header.site .nav');
    if(nav&&!document.getElementById('menuBtn')){
      var btn=document.createElement('button');
      btn.className="icon-btn menu-btn"; btn.id="menuBtn"; btn.type="button";
      btn.setAttribute("aria-label","Open menu"); btn.setAttribute("aria-expanded","false");
      btn.setAttribute("aria-controls","sideMenu");
      btn.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg>';
      nav.insertBefore(btn,nav.firstChild);
    }
    if(!document.getElementById('sideMenu')){
      var links=[
        {label:"Home",href:homeHref,page:"index.html"},
        {label:"About Us",href:ZVPAGES+"about.html",page:"about.html"},
        {label:"Collection",href:ZVPAGES+"collection.html",page:"collection.html"},
        {label:"Feature Product",href:isHome?"#featured":(ZVROOT+"index.html#featured"),page:""},
        {label:"Most Selling Items",href:isHome?"#best-sellers":(ZVROOT+"index.html#best-sellers"),page:""},
        {label:"Review",href:ZVPAGES+"reviews.html",page:"reviews.html"},
        {label:"Contact Us",href:ZVPAGES+"contact.html",page:"contact.html"}
      ];
      var cur=(window.location.pathname.split("/").pop()||"index.html").toLowerCase();
      var html='<div class="side-backdrop" id="sideBackdrop"></div>'
        +'<aside class="side-menu" id="sideMenu" aria-label="Site menu" aria-hidden="true">'
        +'<div class="side-head"><a class="logo" href="'+escHtml(homeHref)+'">ZIVORA<small>PURSES &amp; HANDBAGS</small></a>'
        +'<button class="x-btn" id="sideClose" aria-label="Close menu">✕</button></div>'
        +'<nav class="side-links">';
      links.forEach(function(l){
        var active=(l.page&&l.page===cur)?' active':'';
        html+='<a class="side-link'+active+'" href="'+escHtml(l.href)+'"><span class="dot">✦</span>'+escHtml(l.label)+'<span class="arr">→</span></a>';
      });
      html+='</nav><div class="side-foot"><b>Cash on Delivery</b> available · Free delivery on orders over <b>PKR 5,000</b> · 7-day easy exchange</div></aside>';
      document.body.insertAdjacentHTML('beforeend',html);
    }
    var menu=document.getElementById('sideMenu'), bd=document.getElementById('sideBackdrop');
    if(!menu||!bd)return;
    function openSide(){
      menu.classList.add('open'); bd.classList.add('show');
      menu.setAttribute('aria-hidden','false'); document.body.classList.add('menu-open');
      var b=document.getElementById('menuBtn'); if(b)b.setAttribute('aria-expanded','true');
    }
    function closeSide(){
      menu.classList.remove('open'); bd.classList.remove('show');
      menu.setAttribute('aria-hidden','true'); document.body.classList.remove('menu-open');
      var b=document.getElementById('menuBtn'); if(b)b.setAttribute('aria-expanded','false');
    }
    window.openSideMenu=openSide; window.closeSideMenu=closeSide;
    var mb=document.getElementById('menuBtn');
    if(mb&&!mb.dataset.sideBound){mb.dataset.sideBound="1"; mb.addEventListener('click',openSide);}
    var sc=document.getElementById('sideClose');
    if(sc&&!sc.dataset.sideBound){sc.dataset.sideBound="1"; sc.addEventListener('click',closeSide);}
    if(!bd.dataset.sideBound){bd.dataset.sideBound="1"; bd.addEventListener('click',closeSide);}
    menu.querySelectorAll('.side-link').forEach(function(a){
      if(!a.dataset.sideBound){a.dataset.sideBound="1"; a.addEventListener('click',closeSide);}
    });
  }
  buildSideMenu();
  /* if the header was not parsed yet when this ran, retry once the DOM is ready */
  if(!document.getElementById('menuBtn')||!document.getElementById('sideMenu')){
    document.addEventListener('DOMContentLoaded',buildSideMenu);
  }
  if(!window.__zvSideEscBound){
    window.__zvSideEscBound=1;
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&window.closeSideMenu)window.closeSideMenu();});
  }
})();

function renderProducts(filter){
  var g=document.getElementById('productGrid'); if(!g)return; g.innerHTML="";
  var shown=0;
  PRODUCTS.forEach(function(p){
    if(filter!=="All"&&p.sub!==filter)return;
    shown++;
    var d=document.createElement('article'); d.className="pcard tilt";
    d.innerHTML='<div class="pimg"><span class="badge">'+escHtml(p.badge)+'</span>'+
      '<button class="heart'+(wishlist[p.id]?' on':'')+'" aria-label="Add to wishlist">♥</button>'+
      '<img src="'+escHtml(imgSrc(p.img))+'" alt="'+escHtml(p.name)+'" loading="lazy" decoding="async">'+
      '<button class="quick">View Details</button></div>'+
      '<div class="pbody"><span class="cat">'+escHtml(p.cat)+' · '+escHtml(p.sub)+'</span><h3>'+escHtml(p.name)+'</h3>'+colourDots(p)+
      '<div class="stars">★★★★★</div><div class="price"><b>'+fmt(p.price)+'</b><s>'+fmt(p.old)+'</s></div>'+
      '<div class="card-actions"><button class="add-btn">Add to Cart</button><button class="shop-btn">Shop Now</button></div></div>';
    d.querySelector('.heart').onclick=function(e){e.stopPropagation();toggleWish(p.id,this);};
    d.querySelector('.quick').onclick=function(){goProduct(p.id);};
    d.querySelector('.pimg img').onclick=function(){goProduct(p.id);};
    d.querySelector('.add-btn').onclick=function(){addToCart(p.id);};
    d.querySelector('.shop-btn').onclick=function(){shopNow(p.id);};
    var h3=d.querySelector('h3'); h3.style.cursor='pointer'; h3.onclick=function(){goProduct(p.id);};
    g.appendChild(d);
  });
  if(!shown){
    var cs=document.createElement('div'); cs.className="coming-soon";
    cs.innerHTML='<div class="big">👜</div><h3>'+filter+' — Coming Soon</h3><p>New pieces in this category are on their way. Explore the rest of the collection meanwhile.</p>';
    g.appendChild(cs);
  }
  bindTilt();
}

function toggleWish(id,btn){
  wishlist[id]=!wishlist[id]; if(!wishlist[id])delete wishlist[id];
  btn.classList.toggle('on',!!wishlist[id]); saveWish();
  var n=Object.keys(wishlist).length, wc=document.getElementById('wishCount');
  if(wc){wc.textContent=n; wc.style.display=n?'grid':'none';}
  showToast(wishlist[id]?prod(id).name+" saved to wishlist ♡":"Removed from wishlist");
}

/* cart */
function cartQty(){var t=0;for(var k in cart)t+=cart[k];return t;}
function cartTotal(){var t=0;for(var k in cart){var p=prod(+k);if(p)t+=p.price*cart[k];}return t;}
function addToCart(id,noOpen){cart[id]=(cart[id]||0)+1;updateCart();showToast(prod(id).name+" added to your bag 👜");if(!noOpen)openCart();}
/* Shop Now = buy-now: add this piece, then go straight to checkout */
function shopNow(id){addToCart(id,true);openCheckout();}
function setQty(id,q){if(q<=0)delete cart[id];else cart[id]=q;updateCart();}
function updateCart(){
  document.getElementById('cartCount').textContent=cartQty();
  var box=document.getElementById('cartItems'); box.innerHTML="";
  var keys=Object.keys(cart);
  if(!keys.length){box.innerHTML='<div class="empty-cart"><div class="big">👜</div><p>Your bag is empty.<br>Add something beautiful.</p></div>';}
  keys.forEach(function(k){
    var p=prod(+k); if(!p)return; var row=document.createElement('div'); row.className="cart-item";
    row.innerHTML='<img src="'+escHtml(imgSrc(p.img))+'" alt="'+escHtml(p.name)+'"><div><b>'+escHtml(p.name)+'</b><span class="cp">'+fmt(p.price)+'</span><br><span class="qty"><button aria-label="Decrease">−</button><span>'+cart[k]+'</span><button aria-label="Increase">+</button></span></div><div style="text-align:right"><b>'+fmt(p.price*cart[k])+'</b><br><button class="remove">Remove</button></div>';
    var bs=row.querySelectorAll('.qty button');
    bs[0].onclick=function(){setQty(p.id,cart[p.id]-1)};
    bs[1].onclick=function(){setQty(p.id,cart[p.id]+1)};
    row.querySelector('.remove').onclick=function(){setQty(p.id,0)};
    box.appendChild(row);
  });
  var sub=cartTotal(), del=sub===0?0:(sub>=5000?0:250);
  document.getElementById('subTotal').textContent=fmt(sub);
  document.getElementById('delFee').textContent=sub>=5000?"FREE":fmt(del);
  document.getElementById('grandTotal').textContent=fmt(sub+del);
  saveCart();
}
updateCart();
function openCart(){document.getElementById('cartDrawer').classList.add('show');document.getElementById('overlay').classList.add('show');}
function closeCart(){document.getElementById('cartDrawer').classList.remove('show');document.getElementById('overlay').classList.remove('show');}
var cartBtnEl=document.getElementById('cartBtn'); if(cartBtnEl)cartBtnEl.onclick=openCart;
document.getElementById('overlay').onclick=function(){closeCart();document.querySelectorAll('.modal.show').forEach(function(m){m.classList.remove('show');});document.getElementById('overlay').classList.remove('show');};
/* The drawer's Checkout and close buttons are bound here in JS — the same
   way as every other cart control — instead of relying on inline onclick
   attributes alone: the Checkout button was reported dead on tap while
   the JS-bound controls around it (cart open, quantity, remove) worked.
   The "added to your bag" toast also used to sit on top of this button
   (z-index above the drawer) and swallow the tap; it is pointer-events:
   none in site.css now, so taps pass straight through to the button. */
var checkoutBtnEl=document.getElementById('checkoutBtn'); if(checkoutBtnEl)checkoutBtnEl.addEventListener('click',openCheckout);
var cartCloseEl=document.getElementById('cartCloseBtn'); if(cartCloseEl)cartCloseEl.addEventListener('click',closeCart);

/* Popup closing, defined and wired once here so EVERY page has it — the
   pages that only load shared.js (Collection, product, About…) used to call
   closeModal() from their checkout ✕ without the function existing there,
   so the popup could never be closed. The ✕ also gets a direct listener
   (not just the inline onclick), tapping the dimmed backdrop around the
   card closes the popup, and Escape closes the open popup before the
   page-view Escape handlers underneath it can run. */
function closeModal(id){
  var m=document.getElementById(id); if(m)m.classList.remove('show');
  if(document.querySelector('.modal.show'))return;
  var drawer=document.getElementById('cartDrawer');
  if(drawer&&drawer.classList.contains('show'))return;
  var ov=document.getElementById('overlay'); if(ov)ov.classList.remove('show');
  if(!document.querySelector('.page-view:not([hidden])'))document.body.style.overflow='';
}
document.querySelectorAll('.modal').forEach(function(m){
  var x=m.querySelector('.x-btn');
  if(x)x.addEventListener('click',function(){closeModal(m.id);});
  m.addEventListener('click',function(e){if(e.target===m)closeModal(m.id);});
});
document.addEventListener('keydown',function(e){
  if(e.key!=='Escape')return;
  var open=document.querySelectorAll('.modal.show');
  if(!open.length)return;
  open.forEach(function(m){closeModal(m.id);});
  e.stopImmediatePropagation();
});

/* checkout — a separate page, like normal websites: the cart drawer's
   Checkout button and every Shop Now button navigate to checkout.html,
   which carries the order summary, the Shopify-style form and the
   Supabase order save. There is no checkout popup anymore.
   One exception: the single-document preview serves this site from a
   blob: URL, where there is no checkout.html file to navigate to — the
   navigation silently failed there, so Shop Now only added the piece to
   the bag and the drawer's Checkout button appeared dead. In that
   environment the homepage's in-page Checkout view (window.openCheckoutView,
   same summary, form and order save) opens instead. */
function openCheckout(){
  if(!cartQty()){showToast("Your bag is empty — add a piece first");return;}
  saveCart();
  try{
    if(window.location.protocol==='blob:'&&typeof window.openCheckoutView==='function'){
      closeCart();
      window.openCheckoutView();
      return;
    }
  }catch(e){}
  window.location.href=ZVPAGES+"checkout.html";
}

/* toast */
var toastTimer;
function showToast(msg){var t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(function(){t.classList.remove('show')},2600);}

/* tilt */
function bindTilt(){
  if(window.matchMedia('(hover: none)').matches)return;
  document.querySelectorAll('.tilt').forEach(function(el){
    if(el.dataset.tiltBound)return; el.dataset.tiltBound=1;
    el.addEventListener('mousemove',function(e){
      var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      el.style.transform="perspective(800px) rotateY("+(x*10)+"deg) rotateX("+(-y*10)+"deg) translateY(-4px)";
    });
    el.addEventListener('mouseleave',function(){el.style.transform="";});
  });
}
bindTilt();

/* init shared chrome */
updateCart();
(function(){var wc=document.getElementById('wishCount'); if(wc){var n=Object.keys(wishlist).length; wc.textContent=n; wc.style.display=n?'grid':'none';}})();
/* auto-load live products on page open (fallback = built-in 56) */
loadRemoteProducts(false);

/* ===== Header Collection dropdown: tap-to-open on touch devices (hover and
   keyboard focus open it on desktop via CSS). First tap on Collection opens
   the menu; tapping an item (or Collection again) follows the link. ===== */
(function(){
  function closeAll(except){
    document.querySelectorAll('.has-drop.open').forEach(function(w){
      if(w!==except){w.classList.remove('open');var t=w.querySelector('.nav-drop-toggle');if(t)t.setAttribute('aria-expanded','false');}
    });
  }
  document.querySelectorAll('.has-drop').forEach(function(w){
    var toggle=w.querySelector('.nav-drop-toggle'); if(!toggle)return;
    toggle.addEventListener('click',function(e){
      var touch=window.matchMedia('(hover: none)').matches;
      if(touch&&!w.classList.contains('open')){
        e.preventDefault(); closeAll(w);
        w.classList.add('open'); toggle.setAttribute('aria-expanded','true');
      }else{
        w.classList.remove('open'); toggle.setAttribute('aria-expanded','false');
      }
    });
    w.querySelectorAll('.nav-drop a').forEach(function(a){
      a.addEventListener('click',function(){w.classList.remove('open');toggle.setAttribute('aria-expanded','false');});
    });
  });
  document.addEventListener('click',function(e){
    if(!(e.target instanceof Element)||!e.target.closest('.has-drop'))closeAll(null);
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeAll(null);});
})();
