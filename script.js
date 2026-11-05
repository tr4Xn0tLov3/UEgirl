/* script.js: ядро, данные, аватарки. Дальше грузит b.js и c.js */
var NAME=(window.CFG&&window.CFG.name)||'UEgirl';
function $(s,r){return(r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function LS(k,d){try{var v=localStorage.getItem('sq_'+k);return v==null?d:JSON.parse(v)}catch(e){return d}}
function SV(k,v){try{localStorage.setItem('sq_'+k,JSON.stringify(v))}catch(e){toast('Память заполнена')}}
function E(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function R(n){return Math.round(n).toLocaleString('ru-RU')+' ₽'}
function TD(){var d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
function TI(){return(new Date().getDay()+6)%7}
function showErr(m){var d=document.createElement('div');d.style.cssText='position:fixed;left:8px;right:8px;bottom:8px;z-index:9999;background:#ff4d4d;color:#fff;padding:10px;font:12px monospace;border-radius:8px';d.textContent=m;(document.body||document.documentElement).appendChild(d);setTimeout(function(){d.remove()},15000)}
window.addEventListener('error',function(e){showErr('Ошибка: '+e.message+' ('+String(e.filename||'').split('/').pop()+', строка '+e.lineno+')')});

var G=['Valorant','CS2','Dota 2','Apex','Fortnite','Genshin','Minecraft','LoL'];
var DN=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
var SLT=['—','вечер','ночь','весь день'];
var VB=['Чилл','На победу','Учу и объясняю'];
var TL=['Дзен','Подгорает','Тильт','Берсерк'];
var TC=['#3dff8a','#c8ff3d','#ffb020','#ff4d4d'];
var TCAP=['Спокойна даже после проигрыша','Ворчит, но играет дальше','Эмоции в голосе, катка кипит','Режим берсерка: громко и азартно'];
var RK=['Бронза','Серебро','Золото','Платина','Алмаз','Immortal','Легенда'];
var CLIPS=[['Клатч 1v3 в финальном раунде','Valorant'],['Эйс на последнем пистолете','CS2'],['Камбэк с 0:12','Dota 2'],['Соло против всего сквада','Apex'],['Дуэль в шторм','Fortnite'],['Рейд без потерь','Genshin']];
var NM=['Мика','Лисса','Нейра','Вайпер','Ками','Тень','Рейна','Сола','Эми','Ники','Кира','Юки','Аура','Фрея','Лика','Мира','Ноа','Зара','Рин','Сора','Дина','Эри','Тая','Лоу','Милка','Астра','Вега','Нова','Искра','Ярна','Блик','Сакура','Лайма','Руна','Эльва','Тиса','Рэй','Мэй','Кэт','Лея','Оникс','Фокс','Мята','Полли'];
var FM={'Дуо':1,'Обучение':1.3,'Чилл':.8};
var PRM={'89SQUAD':10,'BRATISHKIN':10,'UEGIRL':10};
var ST=['Ждёт','Подтверждён','Идёт','Завершён','Оплачен'];
var BAD=/(\+?\d[\d\s\-()]{7,}|@\w{3,}|t\.me|telegram|телеграм|whats?app|ватсап|вацап|инста|insta|vk\.com|http|www\.|\.ru|\.com|номер|телефон)/i;
var EV=[
{id:'e1',t:'Турнир 5×5',w:'Сб 20:00',d:'Две команды, комментатор в голосе. В духе 89 squad.',tag:'концепт',pt:1},
{id:'e2',t:'Катка с Братишкиным',w:'Вс 21:00',d:'Идея формата. Участие не подтверждено.',tag:'идея'},
{id:'e3',t:'Ночной дуо-марафон',w:'Пт 23:00',d:'Пять часов подряд: рейтинг и чилл.',tag:'концепт'},
{id:'e4',t:'Мастер-класс по аиму',w:'Ср 19:00',d:'Разбор прицела и чувствительности.',tag:'концепт'}];
var SAF=['Только 18+: возраст подтверждается при регистрации.','Общение только на платформе: контакты в чате блокируются.','Деньги списываются за сессию, а не за знакомство.','Кнопка «Стоп» доступна в любой момент заказа.','Жалоба оформляется в два касания.','Девушка сама решает, что показывать в анкете.','Рейтинг злости: оценка про игру, а не про человека.','Только игровое общение, без интима и сексуальных услуг.','Только свои фото и свой голос.'];
var SR=['Грубость','Просила контакты','Не как в анкете','Другое'];
var AC=[['Первый заказ','Оформи любой заказ'],['Завершил катку','Доведи заказ до конца'],['Избранное','Добавь 3 анкеты в избранное'],['Оценил тильт','Оцени реакцию на проигрыш'],['Пати','Собери пати 5×5'],['Друг','Введи код друга'],['На событие','Запишись на событие'],['Своя анкета','Стань напарницей']];
var LV=['Новичок','Игрок','Напарник','Ветеран','Легенда'];
var MENU=[['home','Главная'],['match','Подбор'],['catalog','Каталог'],['top','Топ'],['party','Пати 5×5'],['events','События'],['become','Стать напарницей'],['safety','Безопасность'],['me','Кабинет']];
var TT={home:NAME,catalog:'Каталог',match:'Подбор',top:'Топ',party:'Пати 5×5',events:'События',become:'Анкета',safety:'Безопасность',me:'Кабинет'};
var BIO=['Люблю тихие вечера и жаркие финалы.','Объясняю без занудства, играю с азартом.','Ночная сова. Дуо, чилл и мемы в голосе.','Давно в играх, рада новичкам.','Разберу вашу игру и подскажу, где рост.','Стараюсь, чтобы было весело, даже когда проигрываем.','Голос спокойный, прицел быстрый.','Играю ради катки, а не ради рейтинга.'];
var GAMER=['Dron','Kirill_9','Zlo','Mash','Nikto','Fenix','Ruslan','Bogdan'];

var sd=89;function rnd(){sd=(sd*1664525+1013904223)%4294967296;return sd/4294967296}
function ri(n){return Math.floor(rnd()*n)}
var P=[];
(function(){
for(var i=0;i<NM.length;i++){
var g=[ri(8)];while(rnd()<.5&&g.length<3){var x=ri(8);if(g.indexOf(x)<0)g.push(x)}
var d=[];for(var j=0;j<7;j++){var q=rnd();d.push(q<.2?0:q<.6?1:q<.85?2:3)}
if(!d.some(function(v){return v>0}))d[5]=1;
var t=rnd(),pz={};if(rnd()<.06)pz[TD()]=1;
P.push({id:'p'+(i+1),n:NM[i],a:18+ri(12),g:g,pr:300+ri(10)*50,r:Math.round((4.3+rnd()*.7)*10)/10,rv:5+ri(140),on:rnd()<.55,v:rnd()<.75,h:ri(1000),bio:BIO[ri(BIO.length)],d:d,vb:ri(3),pz:pz,tl:t<.35?0:t<.7?1:t<.92?2:3,tm:rnd()<.85,rk:ri(7),cl:ri(6),ch:i===3||i===11||i===20,ph:[]});
}
})();
function norm(p){p.d=p.d||[1,1,1,1,1,2,2];p.vb=p.vb||0;p.pz=p.pz||{};p.tl=p.tl||0;p.rk=p.rk||0;p.cl=p.cl||0;p.g=p.g&&p.g.length?p.g:[0];p.ph=p.ph||[];p.rv=p.rv||0;p.r=p.r||5;p.h=p.h||7;if(p.tm===undefined)p.tm=true;return p}
function all(){var m=LS('my',null);return m?[norm(m)].concat(P):P}
function getP(id){var a=all();for(var i=0;i<a.length;i++)if(a[i].id===id)return a[i];return null}
function getO(id){var a=LS('ord',[]);for(var i=0;i<a.length;i++)if(a[i].id===id)return a[i];return null}
function paused(p){return!!(p.pz&&p.pz[TD()])}
function tilt(p){var r=LS('rt',{})[p.id]||[],s=0;r.forEach(function(v){s+=v});return(p.tl*4+s)/(4+r.length)}
function tlv(p){return Math.max(0,Math.min(3,Math.round(tilt(p))))}

/* аватарки: рисуются скриптом, у каждой своя внешность */
function mkr(p){var s=7,t=p.n+'|'+p.h;for(var i=0;i<t.length;i++)s=(Math.imul(s,33)+t.charCodeAt(i))>>>0;return function(n){s=(Math.imul(s,1664525)+1013904223)>>>0;return Math.floor(s/4294967296*n)}}
function face(p){
var r=mkr(p);r(2);r(2);r(2);
var SK=['#f6d5c0','#efc3a5','#e3b08f','#c98a63','#a8683f','#74472b'],HC=['#e9c77b','#c99a52','#7a4a2b','#3a2418','#17120f','#b5442a','#d8b27a'],CL=['#e8efe9','#2a3a33','#1f9d5c','#d9d2c3','#34445a','#7a4a5a','#f0e6d8','#10100f'],BG=['#15201a','#1a2a22','#10201a','#1c2b25'],LP=['#c9606a','#b34a55','#d98b8b','#a8434f'],EC=['#3b2a20','#4a7c59','#3f6fa3','#6b4a2b','#5a6b78'];
var sk=SK[[0,0,1,1,2,2,3,4,5][r(9)]],hi=[0,0,1,1,2,2,3,3,4,4,5,6][r(12)],hc=HC[hi],cl=CL[r(8)],bg=BG[r(4)],lp=LP[r(4)],ec=EC[r(5)];
var st=r(6),fr=r(3),mo=r(3),fk=r(4)===0,gl=r(5)===0,er=r(3)===0,hs=r(3)===0,gc=['#111','#3dff8a','#c8a85a'][r(3)];
var bc=(hi<2||hi===6)?'#8a6a3a':hc;
function pa(d,f){return'<path d="'+d+'" fill="'+f+'"/>'}
function cs(a){return a.map(function(c){return'<circle cx="'+c[0]+'" cy="'+c[1]+'" r="'+c[2]+'" fill="'+hc+'"/>'}).join('')}
var o='<svg class="xa" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><rect width="100" height="100" fill="'+bg+'"/><circle cx="50" cy="50" r="46" fill="#3dff8a" opacity=".06"/>';
if(st<2)o+=pa('M28 46Q24 14 50 14Q76 14 72 46L77 90Q50 97 23 90Z',hc);
if(st===2)o+=pa('M28 46Q24 14 50 14Q76 14 72 46L75 68Q50 76 25 68Z',hc);
if(st===3)o+='<circle cx="50" cy="12" r="9" fill="'+hc+'"/>';
if(st===4)o+=pa('M28 46Q24 14 50 14Q76 14 72 46L72 60Q50 66 28 60Z',hc);
if(st===5)o+=cs([[28,36,11],[36,22,12],[50,17,12],[64,22,12],[72,36,11],[26,52,9],[74,52,9],[29,66,8],[71,66,8]]);
o+=pa('M8 100Q10 80 36 76L64 76Q90 80 92 100Z',cl);
o+='<rect x="44" y="56" width="12" height="24" rx="5" fill="'+sk+'"/><rect x="44" y="66" width="12" height="10" fill="#000" opacity=".14"/>'+pa('M40 76Q50 90 60 76Z',sk);
if(st===0)o+=pa('M31 42Q24 66 27 94L37 94Q33 68 36 46Z',hc)+pa('M69 42Q76 66 73 94L63 94Q67 68 64 46Z',hc);
if(st===1)o+=pa('M31 42Q21 58 29 70Q36 80 26 94L37 94Q45 80 37 68Q32 58 36 46Z',hc)+pa('M69 42Q79 58 71 70Q64 80 74 94L63 94Q55 80 63 68Q68 58 64 46Z',hc);
if(st===4)o+='<path d="M68 52Q82 66 72 94" stroke="'+hc+'" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M68 52Q82 66 72 94" stroke="#000" stroke-opacity=".25" stroke-width="8" stroke-dasharray="1.5 4" fill="none"/>';
o+='<ellipse cx="30.5" cy="50" rx="3" ry="4" fill="'+sk+'"/><ellipse cx="69.5" cy="50" rx="3" ry="4" fill="'+sk+'"/><ellipse cx="50" cy="46" rx="20" ry="24" fill="'+sk+'"/>';
o+='<circle cx="36" cy="57" r="4" fill="#ff7a8a" opacity=".18"/><circle cx="64" cy="57" r="4" fill="#ff7a8a" opacity=".18"/>';
[41,59].forEach(function(x){o+='<ellipse cx="'+x+'" cy="49" rx="3.6" ry="2.6" fill="#fff"/><circle cx="'+x+'" cy="49" r="2.2" fill="'+ec+'"/><circle cx="'+x+'" cy="49" r="1" fill="#0b0b0b"/><path d="M'+(x-4.6)+' 48.4Q'+x+' 44.6 '+(x+4.6)+' 48.4" stroke="#1a1210" stroke-width="1.2" fill="none" stroke-linecap="round"/><path d="M'+(x-5)+' 44.2Q'+x+' 41.6 '+(x+5)+' 43.6" stroke="'+bc+'" stroke-width="1.7" fill="none" stroke-linecap="round"/>'});
o+='<path d="M50 52Q48.5 57 51 58" stroke="#000" stroke-opacity=".25" stroke-width="1" fill="none" stroke-linecap="round"/>';
o+='<path d="'+['M44 62Q50 68 56 62','M45 63Q51 66 56 61.5','M45.5 63.5Q50 65 54.5 63.5'][mo]+'" stroke="'+lp+'" stroke-width="2" fill="none" stroke-linecap="round"/>';
if(fk)[[43,54],[46,55.5],[49,54.2],[52,55.5],[55,54],[57,55.5],[41.5,56]].forEach(function(c){o+='<circle cx="'+c[0]+'" cy="'+c[1]+'" r=".7" fill="#8a5a3a" opacity=".55"/>'});
if(st===5)o+=cs([[37,29,8],[50,26,9],[63,29,8],[31,39,6],[69,39,6]]);
else o+=pa(['M29 48Q24 14 50 14Q76 14 71 48Q66 32 56 27Q42 36 29 48Z','M29 46Q24 14 50 14Q76 14 71 46Q70 38 62 36Q50 41 38 36Q30 38 29 46Z','M29 48Q24 14 50 14Q76 14 71 48Q63 30 50 26Q37 30 29 48Z'][fr],hc);
if(er)o+='<circle cx="30" cy="55" r="1.6" fill="#e8c35a"/><circle cx="70" cy="55" r="1.6" fill="#e8c35a"/>';
if(gl)o+='<circle cx="41" cy="49" r="6.5" fill="#fff" fill-opacity=".07" stroke="'+gc+'" stroke-width="1.2"/><circle cx="59" cy="49" r="6.5" fill="#fff" fill-opacity=".07" stroke="'+gc+'" stroke-width="1.2"/><path d="M47.5 48.5Q50 47 52.5 48.5" stroke="'+gc+'" stroke-width="1.2" fill="none"/>';
if(hs)o+='<path d="M27 48Q26 12 50 12Q74 12 73 48" fill="none" stroke="#1b1f1d" stroke-width="3.2"/><rect x="23" y="44" width="7" height="14" rx="3" fill="#1b1f1d" stroke="#3dff8a" stroke-width="1"/><rect x="70" y="44" width="7" height="14" rx="3" fill="#1b1f1d" stroke="#3dff8a" stroke-width="1"/><path d="M26 56Q28 70 41 68" fill="none" stroke="#1b1f1d" stroke-width="1.6"/><circle cx="42" cy="68" r="2.2" fill="#3dff8a"/>';
return o+'</svg>'}
function av(p){if(p.ph&&p.ph[0])return'<img class="xa" src="'+E(p.ph[0])+'" alt="">';return face(p)}

function ch(txt,on,at,cls){return'<button class="xch'+(on?' on':'')+(cls?' '+cls:'')+'" '+at+'>'+txt+'</button>'}
function nf(){return'<h2>Не найдено</h2><a class="xb" href="#/">На главную</a>'}
function bal(){return LS('bal',3000)}
function lg(){var m=NAME.match(/^(.*?)(girl)$/i);return m?E(m[1])+'<span>'+m[2]+'</span>':E(NAME)}

function arc(r,a0,a1){function pt(a){a=a*Math.PI/180;return(60+r*Math.cos(a)).toFixed(1)+' '+(62-r*Math.sin(a)).toFixed(1)}return'M'+pt(a0)+' A'+r+' '+r+' 0 0 1 '+pt(a1)}
function meter(v){v=Math.max(0,Math.min(3,v));var s='<svg viewBox="0 0 120 72" class="mtr">';
for(var i=0;i<4;i++)s+='<path d="'+arc(48,178-i*45,182-(i+1)*45)+'" stroke="'+TC[i]+'" stroke-width="9" fill="none" opacity="'+(Math.round(v)===i?1:.3)+'"/>';
var a=(180-(v+.5)*45)*Math.PI/180;
s+='<line x1="60" y1="62" x2="'+(60+38*Math.cos(a)).toFixed(1)+'" y2="'+(62-38*Math.sin(a)).toFixed(1)+'" stroke="#e8efe9" stroke-width="2.5" stroke-linecap="round"/><circle cx="60" cy="62" r="4" fill="#e8efe9"/></svg>';return s}
function tiltBox(p){
if(!p.tm)return'<div class="pn"><b>Рейтинг злости</b><p>Девушка решила не показывать шкалу.</p></div>';
var l=tlv(p),n=(LS('rt',{})[p.id]||[]).length;
return'<div class="pn"><b>Рейтинг злости</b><div class="mt">'+meter(tilt(p))+'<div><div style="font-size:22px;font-weight:800;color:'+TC[l]+'">'+TL[l]+'</div><div class="xs">'+TCAP[l]+'</div><div class="xs">оценок игроков: '+n+'</div></div></div><p class="xs">Оценка про игру, а не про человека.</p></div>'}
function card(p,x){
var fv=LS('fav',[]).indexOf(p.id)>-1;
return'<a class="xc" href="#/p/'+p.id+'"><div class="xaw">'+av(p)+(p.on?'<i class="dot"></i>':'')+(p.ch?'<b class="bdg">Выбор сквада</b>':'')+'</div><div class="xcb"><div class="xn">'+E(p.n)+', '+p.a+'</div><div class="xs">'+p.g.map(function(i){return G[i]}).join(' · ')+'</div><div class="xrw"><span>★ '+p.r.toFixed(1)+'</span><span>'+R(p.pr)+'/ч</span></div>'+(x?'<div class="xs" style="color:#3dff8a">'+x+'</div>':'')+'<div>'+(p.tm?'<span class="xch k'+tlv(p)+'">'+TL[tlv(p)]+'</span>':'')+'<span class="xch">'+RK[p.rk]+'</span></div></div><button class="fv'+(fv?' on':'')+'" data-a="fav" data-id="'+p.id+'">♥</button></a>'}
function vox(p){if(!p.v&&!p.vo)return'';var b='';for(var i=0;i<24;i++)b+='<i style="height:'+(6+((i*7+p.h)%20))+'px"></i>';
return'<div class="pn vx"><button class="vbt" data-a="voice" data-id="'+p.id+'">▶</button><div class="vw">'+b+'</div><div><b>Голос</b><div class="xs">послушай, как она говорит</div></div></div>'}
function killHtml(p,c){return'<div class="pn"><b>Момент недели</b><div class="xs">'+E(c[0])+' · '+c[1]+' · '+E(p.n)+'</div><button class="xb s" style="margin-top:8px" data-a="play" data-n="'+E(p.n)+'">▶ Смотреть</button><div class="kf"></div></div>'}
function sched(p,wz){var h='<div class="sh">';for(var i=0;i<7;i++){var v=p.d[i];h+=(wz?'<button':'<div')+' class="shc'+(v?' a':'')+(i===TI()?' t':'')+'"'+(wz?' data-a="wd" data-i="'+i+'"':'')+'><b>'+DN[i]+'</b>'+SLT[v]+(wz?'</button>':'</div>')}return h+'</div>'}

/* загрузка остальных частей */
function ld(f,cb){var s=document.createElement('script');s.src=f+'?v=3';s.onload=cb;s.onerror=function(){showErr('Не найден файл '+f+'. Проверь имя в репозитории: только маленькие буквы, без пробелов.')};document.head.appendChild(s)}
ld('b.js',function(){ld('c.js')});
