(function(){
'use strict';
const TM=[900,1100,2000];
const $=(s,r)=>(r||document).querySelector(s);
const $$=(s,r)=>Array.from((r||document).querySelectorAll(s));
const LS={g(k,d){try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}},s(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const NAME=(window.CFG&&window.CFG.name)||'UEgirl';
const esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const money=n=>Number(n).toLocaleString('ru-RU')+' ₽';
const pad=n=>(n<10?'0':'')+n;
const BAD=/@|https?:|t\.me|www\.|\d{6,}/i;
const LOAD=Date.now();

let bal=LS.g('sq_bal',3000),fav=LS.g('sq_fav',[]),ord=LS.g('sq_ord',[]),evs=LS.g('sq_ev',[]),promo=LS.g('sq_promo',''),my=LS.g('sq_my',null);
const T0=LS.g('sq_t0',0)||Date.now();LS.s('sq_t0',T0);
const sv=()=>{LS.s('sq_bal',bal);LS.s('sq_fav',fav);LS.s('sq_ord',ord);LS.s('sq_ev',evs);LS.s('sq_promo',promo);LS.s('sq_my',my)};
const ub=()=>{$('#bal').textContent=money(bal)};

/* ---------- дополнительные стили (голос и меню) ---------- */
const XCSS=`
.vx{display:flex;align-items:center;gap:12px;padding:12px 14px;margin:16px 0;background:var(--cd);border:1px solid var(--ln);border-radius:16px}
.vx button{width:48px;height:48px;border-radius:50%;background:var(--g);color:#fff;font-size:18px;flex:none;box-shadow:0 6px 20px rgba(255,79,163,.35)}
.vx .wv{flex:1;display:flex;align-items:center;gap:3px;height:36px}
.vx .wv i{flex:1;border-radius:3px;background:#3a3560;height:calc(var(--b)*1%);transition:background .3s}
.vx.on .wv i{background:var(--pk);animation:vwv .7s ease-in-out infinite alternate;animation-delay:calc(var(--n)*40ms)}
.vx small{display:block;color:var(--mu);font-size:11px}
@keyframes vwv{from{transform:scaleY(.3)}to{transform:scaleY(1)}}
body{padding-bottom:40px}
.cta{bottom:14px}
#toast{bottom:28px}
#mn{width:40px;height:40px;border-radius:12px;background:#1b1735;border:1px solid var(--ln);display:grid;place-content:center;gap:5px}
#mn i{display:block;width:18px;height:2px;border-radius:2px;background:var(--tx);transition:transform .35s,opacity .25s}
#mn.open i:nth-child(1){transform:translateY(7px) rotate(45deg)}
#mn.open i:nth-child(2){opacity:0}
#mn.open i:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
#tb{top:56px;bottom:auto;left:0;right:0;max-width:760px;margin:0 auto;z-index:49;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:14px 14px 16px;border:1px solid var(--ln);border-top:0;border-radius:0 0 22px 22px;background:rgba(14,12,28,.96);box-shadow:0 24px 60px rgba(0,0,0,.6);transform:translateY(-115%);opacity:0;visibility:hidden;transition:transform .5s cubic-bezier(.2,.8,.2,1),opacity .3s,visibility 0s .5s}
#tb.open{transform:none;opacity:1;visibility:visible;transition:transform .5s cubic-bezier(.2,.8,.2,1),opacity .3s,visibility 0s}
#tb a{padding:12px 4px;border-radius:14px;background:#15122a;border:1px solid var(--ln);font-size:12px;opacity:0;transform:translateY(-12px);transition:opacity .35s,transform .35s,background .25s,color .25s}
#tb.open a{opacity:1;transform:none}
#tb.open a:nth-child(2){transition-delay:.05s}
#tb.open a:nth-child(3){transition-delay:.1s}
#tb.open a:nth-child(4){transition-delay:.15s}
#tb.open a:nth-child(5){transition-delay:.2s}
#tb.open a:nth-child(6){transition-delay:.25s}
#tb a.on{background:var(--g);color:#fff}
#tbs{position:fixed;inset:56px 0 0;z-index:48;background:rgba(0,0,0,.45);opacity:0;visibility:hidden;transition:opacity .4s,visibility 0s .4s}
#tbs.open{opacity:1;visibility:visible;transition:opacity .4s,visibility 0s}
@media(min-width:600px){#tb{grid-template-columns:repeat(6,1fr)}}
`;

/* ---------- данные ---------- */
const GM=[['CS2','🔫'],['Dota 2','🛡️'],['Valorant','🎯'],['Apex','🪂'],['Genshin','✨'],['Minecraft','⛏️'],['Fortnite','🏗️'],['Mobile Legends','📱']];
const FM=[['Дуо',1],['Обучение',1.3],['Чилл',0.8]];
const PROMOS={'89SQUAD':10,'BRATISHKIN':10,'UEGIRL':10};
const BIO={'CS2':['Играю на AWP и люблю клатчи. Без токсика, с шутками.','Разберём позиции и раскидки, подтяну тебя на Faceit.'],
'Dota 2':['Саппорт по душе: варды, стаки и тёплые слова в войсе.','Покажу, как не сливать линию. Терпеливо и по делу.'],
'Valorant':['Дуэлянт с хорошим аимом. Возьму тебя в ранкед.','Контроллер, смоки и командная игра. Поднимем ранг.'],
'Apex':['Лечу на драйве, беру топ-1 в паре.','Разберём ротации и бои, научу не умирать на дропе.'],
'Genshin':['Помогу с боссами, артефактами и абиссом.','Уютный сюжет и фарм в войсе, без спешки.'],
'Minecraft':['Строим базы, ходим в шахты, болтаем.','Редстоун и выживание: расскажу, с чего начать.'],
'Fortnite':['Строю быстро, снайплю метко. Погнали в дуо.','Покажу билды и редактирование, шаг за шагом.'],
'Mobile Legends':['Мейн-мидлейнер, играем в паре на ранг.','Подскажу героев и сборки, разберём ошибки.']};
const RV=[['Артём','Играли в Valorant, подняли ранг. Очень приятно в войсе.',5],['Дима','Объясняет понятно, без токсика. Взял ещё на час.',5],['Макс','Хорошее дуо, шутит к месту.',5],['Кирилл','Разобрали позиции в CS2. Пользы много.',4],['Саша','Вежливая, пришла вовремя.',5],['Ваня','Чилл в майнкрафте, отлично отдохнули.',5],['Егор','Научила нескольким фишкам в Dota.',4],['Лёша','Был скептиком, остался доволен.',5],['Никита','Играли в Apex до утра, огонь.',5],['Тимур','Спокойно и по делу.',4],['Рома','Отвечает быстро, играет сильно.',5],['Глеб','Рекомендую для новичков.',5]];
const EV=[{id:1,t:'Турнир 5×5',idea:'идея: матч-шоу в духе 89 squad',d:3,s:68,m:100,tx:'Пять на пять: команды собираются из напарниц и игроков. Комментаторы, призовой фонд, трансляция.'},
{id:2,t:'Катка с Братишкиным',idea:'идея: розыгрыш места в его катке',d:6,s:412,m:500,tx:'Идея: розыгрыш места в катке среди участников UEgirl. Условия обсуждаются.'},
{id:3,t:'Ночной дуо-марафон',idea:'формат сообщества',d:9,s:35,m:60,tx:'Шесть часов дуо с разными напарницами. Смена игры каждый час.'},
{id:4,t:'Мастер-класс по аиму',idea:'формат сообщества',d:12,s:51,m:80,tx:'Час теории и практики в войсе: разминка, чувствительность, контроль отдачи.'}];

function mul(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const P=[];
function mk(id,n,a,h,gi,base,s,r,on,v,nw){const g=gi.map((x,i)=>[GM[x][0],Math.min(1000,base+i*50)]);P.push({id:id,n:n,a:a,h:h,g:g,s:s,r:r,on:!!on,v:!!v,nw:!!nw,bio:BIO[g[0][0]][id%2],rt:3+h%9,x:0})}
[['Mirai',21,330,[2,0],600,380,4.9,1,1],['Kitsune',23,20,[4,7],500,340,4.9,1,1],['Velvet',22,285,[1,3],700,310,4.8,0,1],['NoxAria',20,260,[0,2],850,290,4.9,1,1],['Pixie',19,170,[5,6],400,260,4.8,1,1],['Sakura',24,345,[4,5],450,230,4.7,0,1],['Ember',25,10,[3,2],750,200,4.8,1,1],['Frost',22,200,[0,1],650,185,4.7,1,1]].forEach((d,i)=>mk.apply(null,[i+1].concat(d)));
(function(){const r=mul(89);
'Luna,Aiko,Mia,Nika,Yuna,Alice,Zoe,Lina,Kira,Emi,Dina,Vika,Amy,Rina,Sofi,Lexa,Mika,Tana,Eva,Nana,Juno,Lola,Ivy,Reya,Toma,Sora,Wendy,Hana,Mari,Ruby,Cleo,Dasha,Stasya,Ola,Bella,Kaya'.split(',').forEach((n,i)=>{
const k=1+Math.floor(r()*3),gi=[Math.floor(r()*8)];
while(gi.length<k){const q=Math.floor(r()*8);if(gi.indexOf(q)<0)gi.push(q)}
const a=18+Math.floor(r()*10),h=Math.floor(r()*360),base=300+Math.floor(r()*14)*50,s=5+Math.floor(r()*r()*300),rt=Math.round((4.5+r()*.5)*10)/10,on=r()<.45,v=r()<.7;
mk(9+i,n,a,h,gi,base,s,rt,on,v,i>=30)})})();

const all=()=>my?P.concat([my]):P;
const byId=id=>all().find(p=>p.id==id);
const minp=p=>Math.min.apply(null,p.g.map(x=>x[1]));
const pr=(p,g)=>{const x=p.g.find(y=>y[0]===g);return x?x[1]:minp(p)};
const has=(p,g)=>p.g.some(x=>x[0]===g);
const uo=p=>ord.filter(o=>o.pid==p.id&&o.st!=='cancel').length;
const sales=(p,per)=>(per==='w'?Math.round(p.s*.12):per==='m'?Math.round(p.s*.4):p.s)+uo(p)+(p.x||0);
const rank=(per,g)=>all().filter(p=>!g||has(p,g)).sort((a,b)=>sales(b,per)-sales(a,per)||b.r-a.r);
const place=p=>rank('a','').findIndex(x=>x.id===p.id)+1;
const gi=g=>(GM.find(x=>x[0]===g)||['','🎮'])[1];

/* ---------- аватар (DiceBear) ---------- */
function av(p,k){
k=k||0;
const h=(p.h+k*40)%360;
if(p.ph&&p.ph[k])return '<div class="av" style="--h:'+h+'"><img src="'+p.ph[k]+'" alt=""></div>';
const u='https://api.dicebear.com/9.x/lorelei/svg?seed='+encodeURIComponent(p.n+(k?'-'+k:''));
return '<div class="av" style="--h:'+h+'"><img src="'+u+'" alt="" loading="lazy" onerror="this.style.display=\'none\'"></div>';
}

/* ---------- блоки ---------- */
function card(p,st){return '<div class="pc" '+(st||'')+' data-go="#/p/'+p.id+'">'+av(p)+'<div class="tg">'+(p.nw?'<span class="tag new">🆕 NEW</span>':'')+(p.s>=300?'<span class="tag hot">🔥 ТОП</span>':'')+'</div><button class="fv '+(fav.includes(p.id)?'on':'')+'" data-fv="'+p.id+'" aria-label="В избранное">♥</button><div class="in"><div class="nm"><span class="od '+(p.on?'':'off')+'"></span>'+esc(p.n)+', '+p.a+'</div><div class="mt">'+p.g.map(x=>x[0]).slice(0,2).join(' · ')+'</div><div class="pr">от '+minp(p)+' ₽/ч <span class="star">★'+p.r+'</span></div></div></div>'}
function best(p,g,pc,extra,why){return '<div class="best"><div data-go="#/p/'+p.id+'">'+av(p)+'</div><div class="bd"><span class="match">🔥 Совпадение '+pc+'%</span><h3>'+esc(p.n)+', '+p.a+' '+(p.on?'<span class="od"></span>':'')+'</h3><p>'+p.g.map(x=>x[0]).join(' · ')+'</p><div class="why">'+(why||'★ '+p.r+' · ответ ~'+p.rt+' мин')+'</div><div class="chips" style="margin-top:12px"><button class="btn sm" data-bk="'+p.id+'|'+(g||'')+'">Забронировать</button><a class="btn gh sm" href="#/p/'+p.id+'">Профиль</a>'+(extra||'')+'</div></div></div>'}
const endT=e=>{let t=T0+e.d*864e5;while(t<Date.now())t+=12096e5;return t};
const cdh=e=>{const d=Math.max(0,endT(e)-Date.now()),x=[Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60,Math.floor(d/1e3)%60];return['дн','ч','мин','с'].map((l,i)=>'<div>'+pad(x[i])+'<small>'+l+'</small></div>').join('')};
const evCard=e=>{const on=evs.includes(e.id),n=e.s+(on?1:0);return '<div class="ev" id="ev'+e.id+'"><div class="idea">'+e.idea+'</div><h3>'+e.t+'</h3><p>'+e.tx+'</p><div class="cd" data-cd="'+e.id+'">'+cdh(e)+'</div><div class="pb"><i style="width:'+Math.round(n/e.m*100)+'%"></i></div><div class="mu" style="font-size:12px">Записались: '+n+' из '+e.m+' (демо)</div><button class="btn '+(on?'gh':'')+' w" style="margin-top:12px" data-act="ev" data-v="'+e.id+'">'+(on?'Вы записаны ✓':'Записаться')+'</button></div>'};
const tickCd=()=>$$('[data-cd]').forEach(el=>{const 
