(function(){'use strict';
var NAME=(window.CFG&&window.CFG.name)||'UEgirl';
function $(s,r){return(r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function LS(k,d){try{var v=localStorage.getItem('sq_'+k);return v==null?d:JSON.parse(v)}catch(e){return d}}
function SV(k,v){try{localStorage.setItem('sq_'+k,JSON.stringify(v))}catch(e){toast('Память заполнена')}}
function E(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function R(n){return Math.round(n).toLocaleString('ru-RU')+' ₽'}
function TD(){var d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
function TI(){return(new Date().getDay()+6)%7}
window.addEventListener('error',function(e){var d=document.createElement('div');d.style.cssText='position:fixed;left:8px;right:8px;bottom:8px;z-index:9999;background:#ff4d4d;color:#fff;padding:10px;font:12px monospace;border-radius:8px';d.textContent='Ошибка: '+e.message+' (строка '+e.lineno+')';document.body.appendChild(d);setTimeout(function(){d.remove()},15000)});

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
for(var i=0;i<NM.length;i++){
var g=[ri(8)];while(rnd()<.5&&g.length<3){var x=ri(8);if(g.indexOf(x)<0)g.push(x)}
var d=[];for(var j=0;j<7;j++){var q=rnd();d.push(q<.2?0:q<.6?1:q<.85?2:3)}
if(!d.some(function(v){return v>0}))d[5]=1;
var t=rnd(),pz={};if(rnd()<.06)pz[TD()]=1;
P.push({id:'p'+(i+1),n:NM[i],a:18+ri(12),g:g,pr:300+ri(10)*50,r:Math.round((4.3+rnd()*.7)*10)/10,rv:5+ri(140),on:rnd()<.55,v:rnd()<.75,h:ri(1000),bio:BIO[ri(BIO.length)],d:d,vb:ri(3),pz:pz,tl:t<.35?0:t<.7?1:t<.92?2:3,tm:rnd()<.85,rk:ri(7),cl:ri(6),ch:i===3||i===11||i===20,ph:[]});
}
function norm(p){p.d=p.d||[1,1,1,1,1,2,2];p.vb=p.vb||0;p.pz=p.pz||{};p.tl=p.tl||0;p.rk=p.rk||0;p.cl=p.cl||0;p.g=p.g&&p.g.length?p.g:[0];p.ph=p.ph||[];p.rv=p.rv||0;p.r=p.r||5;p.h=p.h||7;if(p.tm===undefined)p.tm=true;return p}
function all(){var m=LS('my',null);return m?[norm(m)].concat(P):P}
function getP(id){var a=all();for(var i=0;i<a.length;i++)if(a[i].id===id)return a[i];return null}
function getO(id){var a=LS('ord',[]);for(var i=0;i<a.length;i++)if(a[i].id===id)return a[i];return null}
function paused(p){return!!(p.pz&&p.pz[TD()])}
function tilt(p){var r=LS('rt',{})[p.id]||[],s=0;r.forEach(function(v){s+=v});return(p.tl*4+s)/(4+r.length)}
function tlv(p){return Math.max(0,Math.min(3,Math.round(tilt(p))))}
function av(p){var s=p.ph&&p.ph[0]?p.ph[0]:'https://api.dicebear.com/9.x/lorelei/svg?seed='+encodeURIComponent(p.n)+'-'+(p.h%9)+'&backgroundColor=1c231f,15201a,23302a';return'<img class="xa" src="'+E(s)+'" alt="" loading="lazy">'}
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

/* состояния */
var F={g:-1,vb:-1,on:0,dz:0,tl:0,ch:0,s:'r'};
var M={g:0,vb:-1,max:1000,t:0};
var BK={pid:'',h:2,mode:'Дуо',day:-1,promo:'',abo:0};
var PT={sel:[],h:2};
var W={s:1,n:'',a:'',g:[],pr:500,rk:2,d:[0,0,0,0,0,0,0],vb:0,tm:1,tl:0,bio:'',ph:[],ok:0};
var STP={i:-1,id:''};var RIN='';

/* страницы */
function pgHome(){
var on=all().filter(function(p){return p.on&&!paused(p)}).slice(0,8);
var wk=Math.floor(Date.now()/604800000),p=P[wk%P.length];
return'<section class="hero"><div class="kick">Гейм-компаньоны · 18+</div><h1>Играй с теми,<br>кто <em>понимает</em> игру</h1><p>Дуо, обучение и чилл в голосе. Живые анкеты, расписание и рейтинг злости.</p><div class="btns"><a class="xb g" href="#/match">Подобрать напарницу</a><a class="xb" href="#/catalog">Каталог</a></div></section>'
+'<h2>Сейчас онлайн</h2><div class="xg">'+on.map(function(x){return card(x)}).join('')+'</div>'
+'<h2>Рейтинг злости</h2><div class="pn"><div class="mt">'+meter(1.4)+'<div>'+TL.map(function(t,i){return'<span class="xch k'+i+'">'+t+'</span>'}).join('')+'</div></div><p>Как напарница держится после проигрыша. Игроки выбирают готовый вариант, а сама девушка решает, показывать шкалу или нет. Оценка про игру, а не про человека.</p><button class="xb s" data-a="fq" data-k="dz">Хочу дзен</button> <button class="xb s" data-a="fq" data-k="tl">Люблю тильт</button></div>'
+killHtml(p,CLIPS[p.cl])
+'<h2>89 squad</h2><div class="pn"><b>Сквад Владимира Братишкина, и он в нём главный.</b><p>UEgirl задумана как площадка, где игроки сквада и его комьюнити находят напарниц по игре. Это концепт: участие не подтверждено.</p><a class="xb s" href="#/events">События</a></div>'
+'<h2>Как это работает</h2><div class="pn"><b>1. Выбери</b><p>Игра, настрой, бюджет и рейтинг злости.</p></div><div class="pn"><b>2. Договорись</b><p>Бронь, чат без контактов, кнопка «Стоп».</p></div><div class="pn"><b>3. Играй</b><p>Оцени катку и получи ачивку.</p></div>'}
function filt(f){return all().filter(function(p){
if(paused(p))return false;if(f.g>=0&&p.g.indexOf(f.g)<0)return false;if(f.vb>=0&&p.vb!==f.vb)return false;
if(f.on&&!p.on)return false;if(f.dz&&!(p.tm&&tlv(p)<=0))return false;if(f.tl&&!(p.tm&&tlv(p)>=2))return false;if(f.ch&&!p.ch)return false;return true})}
function pgCat(){
var l=filt(F);if(F.s==='p')l.sort(function(a,b){return a.pr-b.pr});else l.sort(function(a,b){return b.r-a.r});
var h='<h2>Каталог</h2><div>'+ch('Все игры',F.g<0,'data-a="f" data-k="g" data-v="-1"')+G.map(function(x,i){return ch(x,F.g===i,'data-a="f" data-k="g" data-v="'+i+'"')}).join('')+'</div>';
h+='<div>'+ch('Любой настрой',F.vb<0,'data-a="f" data-k="vb" data-v="-1"')+VB.map(function(x,i){return ch(x,F.vb===i,'data-a="f" data-k="vb" data-v="'+i+'"')}).join('')+'</div>';
h+='<div>'+ch('Онлайн',F.on,'data-a="f" data-k="on"')+ch('Хочу дзен',F.dz,'data-a="f" data-k="dz"')+ch('Люблю тильт',F.tl,'data-a="f" data-k="tl"')+ch('Выбор сквада (макет)',F.ch,'data-a="f" data-k="ch"')+ch('Дешевле',F.s==='p','data-a="f" data-k="s"')+'</div>';
h+='<p class="xs">Найдено: '+l.length+'</p>';
return h+(l.length?'<div class="xg">'+l.map(function(x){return card(x)}).join('')+'</div>':'<div class="pn">Никого не нашли. Сними часть фильтров.</div>')}
function pgMatch(){
var l=all().filter(function(p){return!paused(p)}).map(function(p){var s=0;
if(p.g.indexOf(M.g)>-1)s+=40;if(M.vb<0||p.vb===M.vb)s+=20;if(p.pr<=M.max)s+=15;
if(M.t===0||(p.tm&&((M.t===1&&tlv(p)<=0)||(M.t===2&&tlv(p)>=2))))s+=15;if(p.on)s+=10;return{p:p,s:s}}).sort(function(a,b){return b.s-a.s}).slice(0,6);
var h='<h2>Подбор</h2><div class="pn"><b>Игра</b><div>'+G.map(function(x,i){return ch(x,M.g===i,'data-a="m" data-k="g" data-v="'+i+'"')}).join('')+'</div><b>Настрой</b><div>'+ch('Любой',M.vb<0,'data-a="m" data-k="vb" data-v="-1"')+VB.map(function(x,i){return ch(x,M.vb===i,'data-a="m" data-k="vb" data-v="'+i+'"')}).join('')+'</div><b>Бюджет в час</b><div>'+[400,600,1000,2000].map(function(x){return ch('до '+x,M.max===x,'data-a="m" data-k="max" data-v="'+x+'"')}).join('')+'</div><b>Реакция на проигрыш</b><div>'+['Любая','Хочу дзен','Люблю тильт'].map(function(x,i){return ch(x,M.t===i,'data-a="m" data-k="t" data-v="'+i+'"')}).join('')+'</div></div><h2>Совпадения</h2><div class="xg">';
return h+l.map(function(o){return card(o.p,'совпадение '+o.s+'%')}).join('')+'</div>'}
function pgTop(){
var l=all().filter(function(p){return!paused(p)}).sort(function(a,b){return b.r*Math.log(b.rv+2)-a.r*Math.log(a.rv+2)}).slice(0,10);
return'<h2>Топ недели</h2>'+l.map(function(p,i){return'<a class="xr" href="#/p/'+p.id+'"><b style="color:#3dff8a;width:24px">'+(i+1)+'</b><div style="width:44px;height:44px;border-radius:50%;overflow:hidden">'+av(p)+'</div><div style="flex:1"><div class="xn">'+E(p.n)+'</div><div class="xs">★ '+p.r.toFixed(1)+' · '+p.rv+' отзывов</div></div><span>'+R(p.pr)+'</span></a>'}).join('')}
function pgParty(){
var l=all().filter(function(p){return p.on&&!paused(p)}).slice(0,14);
var sum=0;PT.sel.forEach(function(id){var p=getP(id);if(p)sum+=p.pr});
var base=sum*PT.h,tot=base*.9,ok=PT.sel.length>=2&&PT.sel.length<=4;
return'<h2>Пати 5×5</h2><p>Выбери 2–4 напарниц в один заказ. Скидка на пати 10%.</p><div class="pn">'+l.map(function(p){return ch(E(p.n)+' · '+R(p.pr),PT.sel.indexOf(p.id)>-1,'data-a="pts" data-id="'+p.id+'"')}).join('')+'</div><div class="pn"><b>Часов</b><div>'+[1,2,3,5].map(function(x){return ch(x+' ч',PT.h===x,'data-a="pk" data-v="'+x+'"')}).join('')+'</div><div class="xrw"><span>Выбрано: '+PT.sel.length+'</span><span>'+R(base)+'</span></div><div class="xrw"><b>Итого со скидкой</b><b style="color:#3dff8a">'+R(tot)+'</b></div><button class="xb g blk" data-a="party"'+(ok?'':' style="opacity:.5"')+'>Собрать пати</button></div>'}
function revs(p){var T=['Объяснила всё по полочкам, ранг вырос.','Классное общение, катка прошла на одном дыхании.','Спокойный голос, даже когда проигрывали.','Смешно комментировала, время пролетело.','Подсказала по позициям, очень помогло.'];
var h='';for(var i=0;i<3;i++)h+='<div class="xr"><div><b>'+GAMER[(p.h+i*3)%GAMER.length]+'</b> <span class="xs">★ 5</span><div class="xs">'+T[(p.h+i)%T.length]+'</div></div></div>';return h}
function pgProf(id){
var p=getP(id);if(!p)return nf();var mine=p.id==='my';
var h='<div class="big"><div class="xaw">'+av(p)+'</div></div><h1 style="margin-top:14px">'+E(p.n)+', '+p.a+'</h1><div class="xs">'+(paused(p)?'на паузе сегодня':p.on?'онлайн':'не в сети')+'</div><div style="margin-top:8px">'+p.g.map(function(i){return'<span class="xch">'+G[i]+'</span>'}).join('')+'<span class="xch">'+RK[p.rk]+'</span><span class="xch">'+VB[p.vb]+'</span>'+(p.ch?'<span class="xch k0">Выбор сквада · макет</span>':'')+'</div>';
h+='<div class="st"><div><b>★ '+p.r.toFixed(1)+'</b>рейтинг</div><div><b>'+p.rv+'</b>отзывов</div><div><b>'+p.pr+'</b>₽ в час</div></div><p>'+E(p.bio)+'</p>'+vox(p)+tiltBox(p)+killHtml(p,CLIPS[p.cl])+'<h2>Расписание</h2>'+sched(p)+'<h2>Отзывы</h2>'+revs(p);
h+='<div class="btns"><a class="xb g" href="#/book/'+p.id+'">Забронировать</a><button class="xb" data-a="fav" data-id="'+p.id+'">В избранное</button>'+(mine?'':'<button class="xb" data-a="rep" data-id="'+p.id+'">Пожаловаться</button>')+'</div>';
if(mine)h+='<div class="btns"><button class="xb s" data-a="pause">'+(paused(p)?'Снять паузу':'Пауза на сегодня')+'</button></div>';
return h}
function bsum(p){var base=p.pr*BK.h*FM[BK.mode],code=PRM[(BK.promo||'').trim().toUpperCase()]||0,d=Math.min(25,code+(BK.abo?15:0));return{base:base,d:d,tot:base*(1-d/100)}}
function sumHtml(p){var s=bsum(p);return'<div class="xrw"><span>'+BK.h+' ч · '+BK.mode+'</span><span>'+R(s.base)+'</span></div>'+(s.d?'<div class="xrw"><span>Скидка '+s.d+'%'+(s.d===25?' (максимум)':'')+'</span><span>−'+R(s.base-s.tot)+'</span></div>':'')+'<div class="xrw"><b>Итого</b><b style="color:#3dff8a">'+R(s.tot)+'</b></div>'}
function pgBook(id){
var p=getP(id);if(!p)return nf();
if(BK.pid!==id){BK={pid:id,h:2,mode:'Дуо',day:-1,promo:'',abo:0}}
if(BK.day<0||!p.d[BK.day]){BK.day=0;for(var i=0;i<7;i++)if(p.d[i]){BK.day=i;break}}
if(paused(p))return'<h2>Бронь</h2><div class="pn">'+E(p.n)+' сегодня на паузе. Загляни завтра.</div><a class="xb" href="#/p/'+p.id+'">К анкете</a>';
var h='<h2>Бронь · '+E(p.n)+'</h2><div class="pn"><b>Формат</b><div>'+['Дуо','Обучение','Чилл'].map(function(x){return ch(x,BK.mode===x,'data-a="bk" data-k="mode" data-v="'+x+'"')}).join('')+'</div>';
if(!BK.abo)h+='<b>Часов</b><div>'+[1,2,3,4].map(function(x){return ch(x+' ч',BK.h===x,'data-a="bk" data-k="h" data-v="'+x+'"')}).join('')+'</div>';
h+='<b>День</b><div>'+p.d.map(function(v,i){return v?ch(DN[i]+' · '+SLT[v],BK.day===i,'data-a="bk" data-k="day" data-v="'+i+'"'):''}).join('')+'</div></div>';
h+='<div class="pn"><label><input type="checkbox" data-c="abo"'+(BK.abo?' checked':'')+'> Абонемент 5 часов, −15%</label><input class="xi" data-c="promo" placeholder="Промокод" value="'+E(BK.promo)+'"><p class="xs">Скидки суммируются, максимум 25%.</p><div id="bsum">'+sumHtml(p)+'</div><button class="xb g blk" data-a="pay">Оплатить из баланса ('+R(bal())+')</button></div>';
return h}
function mkOrder(o){var L=LS('ord',[]);L.unshift(o);SV('ord',L)}
function pgOrd(id){
var o=getO(id);if(!o)return nf();var p=getP(o.pid);
var h='<h2>Заказ · '+E(o.n)+'</h2><div class="pn"><div class="xrw"><span>'+o.hrs+' ч · '+E(o.mode)+'</span><b>'+R(o.total)+'</b></div><div class="xs">'+E(o.day)+(o.party?' · пати':'')+'</div>';
if(o.st<0)h+='<p>Заказ остановлен. Возвращено: '+R(o.rf||0)+'</p>';
else h+='<div class="os">'+ST.map(function(s,i){return'<div class="osd'+(i<=o.st?' on':'')+'">'+s+'</div>'}).join('')+'</div>';
h+='</div><div class="pn"><b>Чат</b><div class="cht">'+o.msgs.map(function(m){return'<div class="xm1'+(m.m?' me':'')+'">'+E(m.t)+'</div>'}).join('')+'</div><input id="ci" class="xi" maxlength="200" placeholder="Сообщение (без контактов)"><button class="xb g blk" data-a="send" data-id="'+o.id+'">Отправить</button></div>';
if(o.st>=3&&!o.rt&&p)h+='<div class="pn"><b>Как она реагирует на проигрыш?</b><p class="xs">Оценка про игру, а не про человека.</p>'+TL.map(function(t,i){return ch(t,0,'data-a="rate" data-id="'+o.id+'" data-v="'+i+'"','k'+i)}).join('')+'</div>';
if(o.st>=0&&o.st<4)h+='<button class="xb w blk" data-a="stop" data-id="'+o.id+'">Стоп</button>';
return h}
function pgEv(){var j=LS('ev',[]);return'<h2>События</h2>'+EV.map(function(e){var on=j.indexOf(e.id)>-1;return'<div class="pn"><div class="xrw"><b>'+e.t+'</b><span class="xch">'+e.tag+'</span></div><div class="xs">'+e.w+'</div><p>'+e.d+'</p><button class="xb s'+(on?'':' g')+'" data-a="ev" data-id="'+e.id+'">'+(on?'Вы записаны':'Записаться')+'</button> '+(e.pt?'<a class="xb s" href="#/party">Собрать пати</a>':'')+'</div>'}).join('')+'<p class="xs">Формат «Катка с Братишкиным» только идея, без согласования.</p>'}
function pgSafe(){return'<h2>Безопасность</h2>'+SAF.map(function(s,i){return'<div class="pn"><b style="color:#3dff8a">'+(i+1)+'</b> '+s+'</div>'}).join('')}
function pgBecome(){
var h='<h2>Стать напарницей</h2><div class="os">'+[1,2,3,4].map(function(i){return'<div class="osd'+(i<=W.s?' on':'')+'">шаг '+i+'</div>'}).join('')+'</div><div class="pn">';
if(W.s===1)h+='<b>Ник и возраст</b><input class="xi" data-c="wn" maxlength="16" placeholder="Ник" value="'+E(W.n)+'"><input class="xi" data-c="wa" type="number" inputmode="numeric" placeholder="Возраст (18+)" value="'+E(W.a)+'"><p class="xs">Платформа только для совершеннолетних.</p>';
if(W.s===2){h+='<b>Игры (до 3)</b><div>'+G.map(function(x,i){return ch(x,W.g.indexOf(i)>-1,'data-a="wg" data-v="'+i+'"')}).join('')+'</div><b>Цена в час</b><div>'+[300,500,800,1200].map(function(x){return ch(R(x),W.pr===x,'data-a="ws" data-k="pr" data-v="'+x+'"')}).join('')+'</div><b>Ранг</b><div>'+RK.map(function(x,i){return ch(x,W.rk===i,'data-a="ws" data-k="rk" data-v="'+i+'"')}).join('')+'</div><b>Расписание (нажми на день)</b>'+sched({d:W.d},1)}
if(W.s===3)h+='<b>Фото (до 3, по желанию)</b><div class="xg" style="grid-template-columns:repeat(3,1fr)">'+W.ph.map(function(s){return'<img src="'+E(s)+'" style="width:100%;border-radius:10px">'}).join('')+'</div><input class="xi" type="file" accept="image/*" data-c="wph"><p class="xs">Только свои фото. Если оставить пустым, будет аватар.</p>';
if(W.s===4)h+='<b>Настрой</b><div>'+VB.map(function(x,i){return ch(x,W.vb===i,'data-a="ws" data-k="vb" data-v="'+i+'"')}).join('')+'</div><b>Как реагируешь на проигрыш</b><div>'+TL.map(function(x,i){return ch(x,W.tm&&W.tl===i,'data-a="wt" data-v="'+i+'"','k'+i)}).join('')+ch('Не показывать',!W.tm,'data-a="wt" data-v="-1"')+'</div><textarea class="xi" data-c="wb" maxlength="160" placeholder="О себе">'+E(W.bio)+'</textarea><label><input type="checkbox" data-c="wok"'+(W.ok?' checked':'')+'> Мне 18+, фото и голос мои</label>';
h+='</div><div class="btns">'+(W.s>1?'<button class="xb" data-a="w" data-v="back">Назад</button>':'')+(W.s<4?'<button class="xb g" data-a="w" data-v="next">Далее</button>':'<button class="xb g" data-a="w" data-v="pub">Опубликовать</button>')+'</div>';return h}
function achs(){var o=LS('ord',[]);return[o.length>0,o.some(function(x){return x.st>=3}),LS('fav',[]).length>=3,Object.keys(LS('rt',{})).length>0,o.some(function(x){return x.party}),LS('ref',0)===1,LS('ev',[]).length>0,!!LS('my',null)]}
function chkAch(){var a=achs(),old=LS('ach',[]);a.forEach(function(x,i){if(x&&!old[i])toast('Ачивка: '+AC[i][0])});SV('ach',a)}
function refc(){var c=LS('refc','');if(!c){var s='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';c='UE-';for(var i=0;i<4;i++)c+=s.charAt(Math.floor(Math.random()*s.length));SV('refc',c)}return c}
function pgMe(){
var a=achs(),n=a.filter(Boolean).length,lv=Math.min(4,Math.floor(n/2)),my=LS('my',null),ord=LS('ord',[]),fav=LS('fav',[]).map(getP).filter(Boolean);
var h='<h2>Кабинет</h2><div class="st"><div><b>'+R(bal())+'</b>баланс</div><div><b>'+LV[lv]+'</b>уровень</div><div><b>'+n+'/8</b>ачивки</div></div><div class="btns"><button class="xb s" data-a="topup">+1000 ₽ (демо)</button><button class="xb s" data-a="test">+ тестовый заказ</button></div>';
if(my){norm(my);h+='<h2>Моя анкета</h2><div class="pn"><a class="xb s" href="#/p/my">Открыть</a> <button class="xb s" data-a="pause">'+(paused(my)?'Снять паузу':'Пауза на сегодня')+'</button> <button class="xb s" data-a="mytm">Рейтинг злости: '+(my.tm?'показан':'скрыт')+'</button> <button class="xb s w" data-a="delmy">Удалить</button></div>'}
h+='<h2>Заказы</h2>'+(ord.length?ord.map(function(o){return'<a class="xr" href="#/o/'+o.id+'"><div style="flex:1"><b>'+E(o.n)+'</b><div class="xs">'+(o.st<0?'остановлен':ST[o.st])+' · '+R(o.total)+'</div></div>›</a>'}).join(''):'<p>Пока пусто.</p>');
h+='<h2>Избранное</h2>'+(fav.length?'<div class="xg">'+fav.map(function(x){return card(x)}).join('')+'</div>':'<p>Нажми ♥ на карточке.</p>');
h+='<h2>Ачивки</h2><div class="pn">'+AC.map(function(x,i){return'<div class="xr"><span style="color:#3dff8a">'+(a[i]?'✓':'○')+'</span><div><b>'+x[0]+'</b><div class="xs">'+x[1]+'</div></div></div>'}).join('')+'</div>';
h+='<h2>Реферальный код</h2><div class="pn"><p>Твой код: <b style="color:#3dff8a">'+refc()+'</b></p><input class="xi" data-c="rin" placeholder="Код друга UE-XXXX" value="'+E(RIN)+'"><button class="xb s" data-a="rapply">Применить (+300 ₽ один раз)</button></div>';
h+='<p class="xs">Жалоб отправлено: '+LS('rep',[]).length+'</p><button class="xb s w" data-a="reset">Сбросить демо-данные</button>';return h}
var PG={home:pgHome,catalog:pgCat,match:pgMatch,top:pgTop,party:pgParty,p:pgProf,book:pgBook,o:pgOrd,events:pgEv,become:pgBecome,safety:pgSafe,me:pgMe};

/* каркас */
var CSS=['*{box-sizing:border-box}','a{color:inherit;text-decoration:none}','h1,h2,h3{margin:0;font-weight:800;letter-spacing:-.02em}','h1{font-size:clamp(28px,7vw,48px);line-height:1.08}','h2{font-size:22px;margin:28px 0 12px}','em{font-style:normal;color:#3dff8a}','p{margin:8px 0;color:#9fb0a5}','b{font-weight:700}',
'#spx{position:fixed;inset:0;z-index:200;background:#060807;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity .6s}','#spx.off{opacity:0;pointer-events:none}','#spi{font-size:46px;font-weight:800}','#spi span,#xlogo span{color:#3dff8a}','#spp{margin:10px 0;color:#6b7d72;font-size:12px}','.pgw{width:160px;height:2px;background:#1c231f}','#xpg{height:100%;width:0;background:#3dff8a}',
'#xh{position:fixed;top:0;left:0;right:0;height:56px;z-index:50;display:flex;align-items:center;gap:10px;padding:0 14px;background:rgba(6,8,7,.94);border-bottom:1px solid #1c231f}','#xlogo{font-size:22px;font-weight:800;margin-right:auto}','.x18{border:1px solid #1f9d5c;color:#3dff8a;font-size:11px;padding:2px 6px;border-radius:5px}','#xbal{font-size:13px;color:#9fb0a5}','#mn{background:none;border:1px solid #1c231f;color:#e8efe9;width:38px;height:34px;border-radius:8px;font-size:18px}',
'#xm{position:fixed;top:56px;right:0;bottom:0;width:260px;max-width:82vw;z-index:49;background:#0b0f0d;border-left:1px solid #1c231f;transform:translateX(100%);transition:transform .3s;padding:10px;overflow:auto}','#xm.on{transform:none}','#xm a{display:block;padding:13px 12px;border-bottom:1px solid #1c231f}','#xm a.on{color:#3dff8a}','#xo{position:fixed;inset:56px 0 0 0;z-index:48;background:rgba(0,0,0,.5);display:none}','#xo.on{display:block}',
'#xa{padding:70px 16px 30px;max-width:1100px;margin:0 auto;min-height:80vh}','.xg{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}',
'.xc{position:relative;display:block;background:#0b0f0d;border:1px solid #1c231f;border-radius:14px;overflow:hidden;transition:border-color .2s,transform .2s}','.xc:hover{border-color:#1f9d5c;transform:translateY(-2px)}','.xaw{position:relative;aspect-ratio:1;background:#15201a;overflow:hidden}','.xa{width:100%;height:100%;object-fit:cover;display:block}',
'.dot{position:absolute;top:8px;left:8px;width:10px;height:10px;border-radius:50%;background:#3dff8a;box-shadow:0 0 8px #3dff8a;animation:xp 2s infinite}','.bdg{position:absolute;bottom:6px;left:6px;background:#3dff8a;color:#03150a;font-size:10px;padding:2px 6px;border-radius:5px}','.xcb{padding:10px}','.xn{font-weight:700}','.xs{font-size:12px;color:#6b7d72;margin:2px 0 6px}','.xrw{display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px}',
'.fv{position:absolute;top:6px;right:6px;width:32px;height:32px;border-radius:50%;border:0;background:rgba(6,8,7,.7);color:#6b7d72;font-size:16px}','.fv.on{color:#ff4d4d}',
'.xch{display:inline-block;border:1px solid #1c231f;border-radius:20px;padding:5px 11px;font-size:12px;margin:0 6px 6px 0;color:#9fb0a5;background:none;font-family:inherit}','.xch.on{border-color:#3dff8a;color:#3dff8a}','.xch.k0{color:#3dff8a;border-color:#1f9d5c}','.xch.k1{color:#c8ff3d;border-color:#7a9a1c}','.xch.k2{color:#ffb020;border-color:#9a6a10}','.xch.k3{color:#ff4d4d;border-color:#9a2a2a}',
'.xb{display:inline-block;border:1px solid #1c231f;background:#0b0f0d;color:#e8efe9;padding:12px 18px;border-radius:10px;font-weight:600;font-size:14px;font-family:inherit;cursor:pointer;text-align:center}','.xb.g{background:#3dff8a;color:#03150a;border-color:#3dff8a}','.xb.s{padding:8px 12px;font-size:13px}','.xb.w{background:#ff4d4d;color:#fff;border-color:#ff4d4d}','.xb.blk{display:block;width:100%;margin-top:8px}',
'.xi{width:100%;background:#0b0f0d;border:1px solid #1c231f;color:#e8efe9;padding:12px;border-radius:10px;font-size:15px;font-family:inherit;margin:6px 0}','textarea.xi{min-height:80px}',
'.pn{background:#0b0f0d;border:1px solid #1c231f;border-radius:14px;padding:14px;margin:12px 0}','.hero{padding:30px 0 10px}','.kick{color:#3dff8a;font-size:12px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:10px}','.btns{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}','.big{max-width:420px;margin:0 auto;border-radius:16px;overflow:hidden;border:1px solid #1c231f}',
'.vx{display:flex;align-items:center;gap:12px}','.vbt{width:44px;height:44px;border-radius:50%;border:0;background:#3dff8a;color:#03150a;font-size:16px;flex:none}','.vw{display:flex;gap:3px;align-items:center;height:30px;flex:1}','.vw i{width:3px;background:#1f9d5c;border-radius:2px;display:block}','.vx.pl .vw i{animation:xp .6s infinite}',
'.sh{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}','.shc{text-align:center;border:1px solid #1c231f;border-radius:10px;padding:8px 2px;font-size:11px;color:#6b7d72;background:none;font-family:inherit}','.shc b{display:block;font-size:13px;color:#e8efe9;margin-bottom:2px}','.shc.a{border-color:#1f9d5c;color:#3dff8a}','.shc.t{background:#10201a}',
'.kf{margin-top:10px;font:12px monospace}','.kl{background:rgba(0,0,0,.5);border-left:2px solid #3dff8a;padding:4px 8px;margin:3px 0}','.kl span{color:#3dff8a}',
'.os{display:flex;gap:4px;margin:10px 0}','.osd{flex:1;text-align:center;font-size:10px;color:#6b7d72;border-top:3px solid #1c231f;padding-top:6px}','.osd.on{border-color:#3dff8a;color:#3dff8a}',
'.cht{max-height:300px;overflow:auto;display:flex;flex-direction:column;gap:6px;margin:8px 0}','.xm1{max-width:80%;padding:8px 12px;border-radius:12px;background:#15201a;font-size:14px;align-self:flex-start}','.xm1.me{align-self:flex-end;background:#1f9d5c;color:#fff}',
'.mt{display:flex;align-items:center;gap:14px;flex-wrap:wrap}','.mtr{width:140px;flex:none}','.st{display:flex;gap:10px;margin:12px 0}','.st div{flex:1;background:#0b0f0d;border:1px solid #1c231f;border-radius:12px;padding:10px;text-align:center;font-size:12px;color:#6b7d72}','.st b{display:block;font-size:18px;color:#3dff8a}','.xr{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #1c231f}',
'#xf{border-top:1px solid #1c231f;padding:26px 16px 50px;color:#6b7d72;font-size:12px;max-width:1100px;margin:0 auto}',
'#xw{position:fixed;inset:0;z-index:90;display:flex;pointer-events:none}','#xw .s{flex:1;background:#0b0f0d;border-right:1px solid #1f9d5c;transform:scaleY(0);transform-origin:bottom;transition:transform .45s cubic-bezier(.7,0,.3,1)}','#xw.in .s{transform:scaleY(1);transform-origin:top}','#xw .s:nth-child(2){transition-delay:.05s}','#xw .s:nth-child(3){transition-delay:.1s}','#xw .s:nth-child(4){transition-delay:.15s}','#xw .s:nth-child(5){transition-delay:.2s}',
'#xwt{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);text-align:center;font-size:clamp(34px,10vw,80px);font-weight:800;color:#3dff8a;text-transform:uppercase;opacity:0;transition:opacity .25s}','#xw.in #xwt{opacity:1}',
'#xt{position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(30px);background:#0b0f0d;border:1px solid #1f9d5c;color:#e8efe9;padding:10px 16px;border-radius:10px;z-index:120;opacity:0;transition:.3s;max-width:90vw;font-size:13px;pointer-events:none}','#xt.on{opacity:1;transform:translateX(-50%)}',
'#xmd{position:fixed;inset:0;z-index:110;background:rgba(0,0,0,.7);display:none;align-items:center;justify-content:center;padding:16px}','#xmd.on{display:flex}','.mdb{background:#0b0f0d;border:1px solid #1c231f;border-radius:16px;padding:18px;width:100%;max-width:400px;max-height:85vh;overflow:auto}',
'#xrec{position:fixed;left:12px;bottom:8px;font:10px monospace;color:#6b7d72;z-index:40;pointer-events:none}'].join('');
var CSS0='html,body{margin:0;background:#060807!important}#xr{min-height:100vh;background:#060807;color:#e8efe9;font:15px/1.5 -apple-system,Segoe UI,Roboto,Arial,sans-serif;overflow-x:hidden}@keyframes xp{0%,100%{opacity:1}50%{opacity:.35}}';
function pre(c){return c.replace(/(^|\})\s*([^{}]+)\{/g,function(m,a,s){return a+s.split(',').map(function(x){return'#xr '+x.trim()}).join(',')+'{'})}

function toast(t){var e=$('#xt');if(!e)return;e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(function(){e.classList.remove('on')},2800)}
function modal(h){var m=$('#xmd');m.innerHTML='<div class="mdb">'+h+'</div>';m.classList.add('on')}
function closeMd(){$('#xmd').classList.remove('on')}
function closeM(){$('#xm').classList.remove('on');$('#xo').classList.remove('on')}
function updBal(){$('#xbal').textContent=R(bal())}
function route(){var a=location.hash.replace(/^#\/?/,'').split('/');return{r:a[0]||'home',id:a[1]}}
function ttl(rt){if(rt.r==='p'||rt.r==='book'){var p=getP(rt.id);if(p)return p.n}if(rt.r==='o'){var o=getO(rt.id);if(o)return o.n}return TT[rt.r]||NAME}
function draw(rt){
var f=PG[rt.r]||pgHome,h;try{h=f(rt.id)}catch(e){h='<h2>Ошибка страницы</h2><p>'+E(e.message)+'</p>'}
$('#xa').innerHTML=h;closeM();
$$('#xm a').forEach(function(a){a.classList.toggle('on',a.getAttribute('data-r')===rt.r)});
var c=$('.cht');if(c)c.scrollTop=1e5;chkAch();updBal()}
function rerender(){var y=window.scrollY;draw(route());window.scrollTo(0,y)}
var busy=false,TM=[500,150,500];
function go(first){
var rt=route();if(first||busy){draw(rt);return}
busy=true;var w=$('#xw');$('#xwt').textContent=ttl(rt);w.classList.add('in');
setTimeout(function(){draw(route());window.scrollTo(0,0);setTimeout(function(){w.classList.remove('in');setTimeout(function(){busy=false},TM[2])},TM[1])},TM[0])}

/* действия */
var A={},C={};
A.fav=function(t){var id=t.dataset.id,l=LS('fav',[]),i=l.indexOf(id);if(i>-1)l.splice(i,1);else l.push(id);SV('fav',l);t.classList.toggle('on');toast(i>-1?'Убрано из избранного':'В избранном');chkAch()};
A.f=function(t){var k=t.dataset.k,v=t.dataset.v;if(k==='on'||k==='ch')F[k]=F[k]?0:1;else if(k==='dz'){F.dz=F.dz?0:1;F.tl=0}else if(k==='tl'){F.tl=F.tl?0:1;F.dz=0}else if(k==='s')F.s=F.s==='p'?'r':'p';else F[k]=+v;rerender()};
A.fq=function(t){F={g:-1,vb:-1,on:0,dz:0,tl:0,ch:0,s:'r'};F[t.dataset.k]=1;if(location.hash==='#/catalog')rerender();else location.hash='#/catalog'};
A.m=function(t){M[t.dataset.k]=+t.dataset.v;rerender()};
A.play=function(t){var box=t.parentNode.querySelector('.kf'),n=t.dataset.n,en=['Ghost','Rush','Nova','Bolt','Zed'],L=[n+' ✕ '+en[0]+' · headshot',n+' ✕ '+en[1]+' · через дым',n+' ✕ '+en[2],'Клатч: раунд за '+n];box.innerHTML='';L.forEach(function(s,i){setTimeout(function(){var d=document.createElement('div');d.className='kl';d.innerHTML=E(s).replace(E(n),'<span>'+E(n)+'</span>');box.appendChild(d)},i*600)})};
A.voice=function(t){var p=getP(t.dataset.id),box=t.closest('.vx');if(!p)return;
if(p.vo){try{var au=new Audio(p.vo);box.classList.add('pl');au.onended=function(){box.classList.remove('pl')};au.play()}catch(e){}return}
if(!window.speechSynthesis){toast('Голос недоступен на этом устройстве');return}
speechSynthesis.cancel();var u=new SpeechSynthesisUtterance('Привет! Я '+p.n+'. Давай сыграем в '+G[p.g[0]]+'. Буду рада напарнику!');u.lang='ru-RU';u.pitch=1+(p.h%4)*.12;
var vs=speechSynthesis.getVoices();if(vs.length&&!vs.some(function(v){return/^ru/i.test(v.lang)}))toast('Нет русского голоса: Настройки → Язык → Синтез речи');
u.onend=function(){box.classList.remove('pl')};box.classList.add('pl');speechSynthesis.speak(u)};
A.bk=function(t){var k=t.dataset.k,v=t.dataset.v;BK[k]=k==='mode'?v:+v;rerender()};
A.pay=function(t){var p=getP(BK.pid);if(!p)return;var s=bsum(p);if(bal()<s.tot){toast('Недостаточно средств: пополни в кабинете');return}
SV('bal',bal()-s.tot);var o={id:'o'+Date.now(),pid:p.id,n:p.n,hrs:BK.h,mode:BK.mode,day:DN[BK.day]+' · '+SLT[p.d[BK.day]],total:s.tot,st:0,msgs:[{m:0,t:'Привет! Я '+p.n+'. Заказ получила, скоро подтвержу.'}]};mkOrder(o);location.hash='#/o/'+o.id};
A.send=function(t){var i=$('#ci'),v=i.value.trim();if(!v)return;if(BAD.test(v)){toast('Контакты в чате запрещены: общение только на платформе');return}
var L=LS('ord',[]),id=t.dataset.id;L.forEach(function(o){if(o.id===id)o.msgs.push({m:1,t:v})});SV('ord',L);rerender();
setTimeout(function(){var R2=['Поняла, договорились!','Отлично, буду вовремя.','Хорошо, а какой ранг у тебя?','Супер, жду катку!'];var L2=LS('ord',[]);L2.forEach(function(o){if(o.id===id)o.msgs.push({m:0,t:R2[Math.floor(Math.random()*R2.length)]})});SV('ord',L2);var r=route();if(r.r==='o'&&r.id===id&&document.activeElement!==$('#ci'))rerender()},1400)};
A.rate=function(t){var o=getO(t.dataset.id),L=LS('ord',[]);L.forEach(function(x){if(x.id===o.id)x.rt=1});SV('ord',L);var r=LS('rt',{});(r[o.pid]=r[o.pid]||[]).push(+t.dataset.v);SV('rt',r);toast('Спасибо, оценка учтена');rerender()};
A.stop=function(t){var o=getO(t.dataset.id);STP={i:-1,id:o.id};stopModal()};
function stopModal(){var o=getO(STP.id),rf=o.st<=1?o.total:o.total/2;modal('<h3>Остановить заказ?</h3><p>Возврат: '+R(rf)+(o.st<=1?' (100%)':' (50%)')+'</p>'+SR.map(function(s,i){return ch(s,STP.i===i,'data-a="sr" data-i="'+i+'"')}).join('')+'<button class="xb w blk" data-a="stopok">Остановить</button><button class="xb blk" data-a="mc">Отмена</button>')}
A.sr=function(t){STP.i=+t.dataset.i;stopModal()};
A.stopok=function(){if(STP.i<0){toast('Выбери причину');return}var L=LS('ord',[]),rp=LS('rep',[]);L.forEach(function(o){if(o.id===STP.id){var rf=o.st<=1?o.total:o.total/2;o.rf=rf;SV('bal',bal()+rf);rp.push({pid:o.pid,r:SR[STP.i],o:o.id,t:Date.now()});o.st=-1}});SV('ord',L);SV('rep',rp);closeMd();toast('Заказ остановлен, деньги возвращены');rerender()};
A.mc=closeMd;
A.rep=function(t){var id=t.dataset.id;modal('<h3>Пожаловаться</h3>'+SR.map(function(s,i){return'<button class="xb blk" data-a="rpk" data-id="'+id+'" data-i="'+i+'">'+s+'</button>'}).join('')+'<button class="xb blk" data-a="mc">Отмена</button>')};
A.rpk=function(t){var r=LS('rep',[]);r.push({pid:t.dataset.id,r:SR[+t.dataset.i],t:Date.now()});SV('rep',r);closeMd();toast('Жалоба отправлена')};
A.ev=function(t){var l=LS('ev',[]),id=t.dataset.id,i=l.indexOf(id);if(i>-1)l.splice(i,1);else l.push(id);SV('ev',l);rerender()};
A.pts=function(t){var id=t.dataset.id,i=PT.sel.indexOf(id);if(i>-1)PT.sel.splice(i,1);else if(PT.sel.length<4)PT.sel.push(id);else toast('Максимум 4 напарницы');rerender()};
A.pk=function(t){PT.h=+t.dataset.v;rerender()};
A.party=function(){if(PT.sel.length<2||PT.sel.length>4){toast('Выбери от 2 до 4 напарниц');return}var sum=0,names=[];PT.sel.forEach(function(id){var p=getP(id);sum+=p.pr;names.push(p.n)});var tot=sum*PT.h*.9;if(bal()<tot){toast('Недостаточно средств');return}
SV('bal',bal()-tot);var o={id:'o'+Date.now(),pid:PT.sel[0],n:names.join(' + '),hrs:PT.h,mode:'Пати',day:'Сегодня вечером',total:tot,st:0,party:1,team:PT.sel.slice(),msgs:[{m:0,t:'Команда в сборе! Подтверждаем время.'}]};mkOrder(o);PT.sel=[];location.hash='#/o/'+o.id};
A.topup=function(){SV('bal',bal()+1000);updBal();rerender()};
A.test=function(){var p=P[Math.floor(Math.random()*P.length)];mkOrder({id:'o'+Date.now(),pid:p.id,n:p.n,hrs:1,mode:'Дуо',day:'Тест',total:0,st:0,msgs:[{m:0,t:'Тестовый заказ. Привет!'}]});rerender()};
A.pause=function(){var m=LS('my',null);if(!m)return;m.pz=m.pz||{};if(m.pz[TD()])delete m.pz[TD()];else m.pz[TD()]=1;SV('my',m);rerender()};
A.mytm=function(){var m=LS('my',null);m.tm=!m.tm;SV('my',m);rerender()};
A.delmy=function(){localStorage.removeItem('sq_my');rerender()};
A.rapply=function(){var c=RIN.trim().toUpperCase();if(LS('ref',0)){toast('Код уже использован');return}if(c===refc()||!/^UE-[A-Z0-9]{4}$/.test(c)){toast('Неверный код');return}SV('ref',1);SV('bal',bal()+300);toast('+300 ₽ на баланс');rerender()};
A.reset=function(){Object.keys(localStorage).forEach(function(k){if(k.indexOf('sq_')===0)localStorage.removeItem(k)});location.hash='#/';location.reload()};
A.wg=function(t){var v=+t.dataset.v,i=W.g.indexOf(v);if(i>-1)W.g.splice(i,1);else if(W.g.length<3)W.g.push(v);else toast('Максимум 3 игры');rerender()};
A.ws=function(t){W[t.dataset.k]=+t.dataset.v;rerender()};
A.wd=function(t){var i=+t.dataset.i;W.d[i]=(W.d[i]+1)%4;rerender()};
A.wt=function(t){var v=+t.dataset.v;if(v<0)W.tm=0;else{W.tm=1;W.tl=v}rerender()};
A.w=function(t){var v=t.dataset.v;
if(v==='back'){W.s--;rerender();return}
if(W.s===1&&(W.n.trim().length<2||+W.a<18)){toast('Введи ник и возраст от 18');return}
if(W.s===2&&!W.g.length){toast('Выбери хотя бы одну игру');return}
if(v==='next'){W.s++;window.scrollTo(0,0);rerender();return}
if(!W.ok){toast('Подтверди 18+ и что фото и голос твои');return}
var my={id:'my',n:W.n.trim(),a:+W.a,g:W.g.slice(),pr:W.pr,r:5,rv:0,on:true,v:true,h:7,bio:W.bio||'Люблю играть в команде.',d:W.d.slice(),vb:W.vb,pz:{},tl:W.tl,tm:!!W.tm,rk:W.rk,cl:0,ch:0,ph:W.ph.slice()};
SV('my',my);toast('Анкета опубликована');location.hash='#/p/my'};
C.wn=function(t){W.n=t.value};C.wa=function(t){W.a=t.value};C.wb=function(t){W.bio=t.value};C.wok=function(t){W.ok=t.checked?1:0};
C.rin=function(t){RIN=t.value};
C.promo=function(t){BK.promo=t.value;var p=getP(BK.pid);if(p)$('#bsum').innerHTML=sumHtml(p)};
C.abo=function(t){BK.abo=t.checked?1:0;if(BK.abo)BK.h=5;else if(BK.h===5)BK.h=2;rerender()};
C.wph=function(t){var f=t.files&&t.files[0];if(!f)return;if(W.ph.length>=3){toast('Максимум 3 фото');t.value='';return}
var rd=new FileReader();rd.onload=function(){var im=new Image();im.onload=function(){var s=Math.min(1,480/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);W.ph.push(c.toDataURL('image/jpeg',.7));rerender()};im.src=rd.result};rd.readAsDataURL(f);t.value=''};

function init(){
var st=document.createElement('style');st.textContent=CSS0+pre(CSS);document.head.appendChild(st);
var root=document.createElement('div');root.id='xr';
root.innerHTML='<div id="spx"><div id="spi">'+lg()+'</div><div id="spp">0%</div><div class="pgw"><div id="xpg"></div></div></div>'
+'<div id="xh"><a id="xlogo" href="#/">'+lg()+'</a><span class="x18">18+</span><span id="xbal"></span><button id="mn" aria-label="Меню">☰</button></div>'
+'<div id="xm">'+MENU.map(function(m){return'<a data-r="'+m[0]+'" href="#/'+(m[0]==='home'?'':m[0])+'">'+m[1]+'</a>'}).join('')+'</div><div id="xo"></div>'
+'<div id="xa"></div>'
+'<div id="xf"><b>'+lg()+'</b> — концепт-прототип. Все анкеты, отзывы, рейтинги и фото вымышлены, платежей нет.<br><br>89 squad — сквад Владимира Братишкина, и он в нём главный. Упоминается как идея партнёрства: участие и одобрение не получены, значок «Выбор сквада» — макет. Публичный показ с их именами только после согласия.<br><br>18+. Только игровое общение.</div>'
+'<div id="xw"><div class="s"></div><div class="s"></div><div class="s"></div><div class="s"></div><div class="s"></div><div id="xwt"></div></div>'
+'<div id="xt"></div><div id="xmd"></div><div id="xrec"></div>';
document.body.appendChild(root);
$$('body>*').forEach(function(n){if(n!==root&&n.tagName!=='SCRIPT')n.style.display='none'});
root.addEventListener('click',function(e){
if(e.target.id==='xmd'){closeMd();return}
if(e.target.closest('#xm a')){closeM()}
var t=e.target.closest('[data-a]');if(!t)return;var f=A[t.getAttribute('data-a')];if(f){e.preventDefault();f(t,e)}});
function onIn(e){var t=e.target.closest?e.target.closest('[data-c]'):null;if(!t)return;var f=C[t.getAttribute('data-c')];if(f)f(t)}
root.addEventListener('input',onIn);root.addEventListener('change',onIn);
root.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.id==='ci'){var b=$('[data-a="send"]');if(b)A.send(b)}});
$('#mn').addEventListener('click',function(){$('#xm').classList.toggle('on');$('#xo').classList.toggle('on')});
$('#xo').addEventListener('click',closeM);
window.addEventListener('hashchange',function(){go(false)});
go(true);
var pr=0,iv=setInterval(function(){pr=Math.min(100,pr+2+Math.random()*5);$('#spp').textContent=Math.floor(pr)+'%';$('#xpg').style.width=pr+'%';if(pr>=100){clearInterval(iv);$('#spx').classList.add('off')}},50);
setTimeout(function(){$('#spx').classList.add('off')},5000);
setInterval(function(){var L=LS('ord',[]),c=0;L.forEach(function(o){if(o.st>=0&&o.st<4){o.st++;c=1}});
if(c){SV('ord',L);var r=route();if(r.r==='o'&&document.activeElement!==$('#ci'))rerender();else chkAch()}},4500);
setInterval(function(){var l=P.filter(function(p){return p.on&&!paused(p)});if(!l.length)return;var p=l[Math.floor(Math.random()*l.length)];toast(p.n+' онлайн · ищет дуо в '+G[p.g[0]])},24000);
var t0=Date.now();setInterval(function(){var s=Math.floor((Date.now()-t0)/1000),m=Math.floor(s/60);$('#xrec').textContent='● REC '+(m<10?'0':'')+m+':'+(s%60<10?'0':'')+(s%60)},1000)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
