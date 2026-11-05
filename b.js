/* b.js: страницы */
var F={g:-1,vb:-1,on:0,dz:0,tl:0,ch:0,s:'r'};
var M={g:0,vb:-1,max:1000,t:0};
var BK={pid:'',h:2,mode:'Дуо',day:-1,promo:'',abo:0};
var PT={sel:[],h:2};
var W={s:1,n:'',a:'',g:[],pr:500,rk:2,d:[0,0,0,0,0,0,0],vb:0,tm:1,tl:0,bio:'',ph:[],ok:0};
var STP={i:-1,id:''};var RIN='';

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
return'<h2>Топ недели</h2>'+l.map(function(p,i){return'<a class="xr" href="#/p/'+p.id+'"><b style="color:#3dff8a;width:24px">'+(i+1)+'</b><div style="width:44px;height:44px;border-radius:50%;overflow:hidden;flex:none">'+av(p)+'</div><div style="flex:1"><div class="xn">'+E(p.n)+'</div><div class="xs">★ '+p.r.toFixed(1)+' · '+p.rv+' отзывов</div></div><span>'+R(p.pr)+'</span></a>'}).join('')}
function pgParty(){
var l=all().filter(function(p){return p.on&&!paused(p)}).slice(0,14);
var sum=0;PT.sel.forEach(function(id){var p=getP(id);if(p)sum+=p.pr});
var base=sum*PT.h,tot=base*.9,ok=PT.sel.length>=2&&PT.sel.length<=4;
return'<h2>Пати 5×5</h2><p>Выбери 2–4 напарниц в один заказ. Скидка на пати 10%.</p><div class="pn">'+l.map(function(p){return ch(E(p.n)+' · '+R(p.pr),PT.sel.indexOf(p.id)>-1,'data-a="pts" data-id="'+p.id+'"')}).join('')+'</div><div class="pn"><b>Часов</b><div>'+[1,2,3,5].map(function(x){return ch(x+' ч',PT.h===x,'data-a="pk" data-v="'+x+'"')}).join('')+'</div><div class="xrw"><span>Выбрано: '+PT.sel.length+'</span><span>'+R(base)+'</span></div><div class="xrw"><b>Итого со скидкой</b><b style="color:#3dff8a">'+R(tot)+'</b></div><button class="xb g blk" data-a="party"'+(ok?'':' style="opacity:.5"')+'>Собрать пати</button></div>'}
function revs(p){var T=['Объяснила всё по полочкам, ранг вырос.','Классное общение, катка прошла на одном дыхании.','Спокойный голос, даже когда проигрывали.','Смешно комментировала, время пролетело.','Подсказала по позициям, очень помогло.'];
var h='';for(var i=0;i<3;i++)h+='<div class="xr"><div><b>'+GAMER[(p.h+i*3)%GAMER.length]+'</b> <span class="xs">★ 5</span><div class="xs">'+T[(p.h+i)%T.length]+'</div></div></div>';return h}
function pgProf(id){
var p=getP(id);if(!p)return nf();var mine=p.id==='my';
var th=p.ph.length>1?'<div class="thm">'+p.ph.map(function(s){return'<button data-a="ph"><img src="'+E(s)+'" alt=""></button>'}).join('')+'</div>':'';
var h='<div class="big"><div class="xaw">'+av(p)+'</div></div>'+th
+'<div class="bkw"><a class="xb g blk" href="#/book/'+p.id+'">Забронировать · '+R(p.pr)+'/ч</a><div class="btns" style="margin-top:8px"><button class="xb s" data-a="fav" data-id="'+p.id+'">♥ В избранное</button>'+(mine?'<button class="xb s" data-a="pause">'+(paused(p)?'Снять паузу':'Пауза на сегодня')+'</button>':'<button class="xb s" data-a="rep" data-id="'+p.id+'">Пожаловаться</button>')+'</div></div>'
+'<h1 style="margin-top:20px">'+E(p.n)+', '+p.a+'</h1><div class="xs">'+(paused(p)?'на паузе сегодня':p.on?'онлайн':'не в сети')+'</div><div style="margin-top:8px">'+p.g.map(function(i){return'<span class="xch">'+G[i]+'</span>'}).join('')+'<span class="xch">'+RK[p.rk]+'</span><span class="xch">'+VB[p.vb]+'</span>'+(p.ch?'<span class="xch k0">Выбор сквада · макет</span>':'')+'</div>';
h+='<div class="st"><div><b>★ '+p.r.toFixed(1)+'</b>рейтинг</div><div><b>'+p.rv+'</b>отзывов</div><div><b>'+p.pr+'</b>₽ в час</div></div><p>'+E(p.bio)+'</p>'+vox(p)+tiltBox(p)+killHtml(p,CLIPS[p.cl])+'<h2>Расписание</h2>'+sched(p)+'<h2>Отзывы</h2>'+revs(p);
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
h+='<div class="pn"><label class="chk"><input type="checkbox" data-c="abo"'+(BK.abo?' checked':'')+'><span>Абонемент 5 часов, −15%</span></label><input class="xi" data-c="promo" placeholder="Промокод" value="'+E(BK.promo)+'"><p class="xs">Скидки суммируются, максимум 25%.</p><div id="bsum">'+sumHtml(p)+'</div><button class="xb g blk" data-a="pay">Оплатить из баланса ('+R(bal())+')</button></div>';
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
if(W.s===3)h+='<b>Фото (до 3, по желанию)</b><div class="xg" style="grid-template-columns:repeat(3,1fr)">'+W.ph.map(function(s){return'<img src="'+E(s)+'" style="width:100%;border-radius:10px">'}).join('')+'</div><input class="xi" type="file" accept="image/*" data-c="wph"><p class="xs">Только свои фото. Если оставить пустым, будет нарисованный аватар.</p>';
if(W.s===4)h+='<b>Настрой</b><div>'+VB.map(function(x,i){return ch(x,W.vb===i,'data-a="ws" data-k="vb" data-v="'+i+'"')}).join('')+'</div><b>Как реагируешь на проигрыш</b><div>'+TL.map(function(x,i){return ch(x,W.tm&&W.tl===i,'data-a="wt" data-v="'+i+'"','k'+i)}).join('')+ch('Не показывать',!W.tm,'data-a="wt" data-v="-1"')+'</div><textarea class="xi" data-c="wb" maxlength="160" placeholder="О себе">'+E(W.bio)+'</textarea><label class="chk"><input type="checkbox" data-c="wok"'+(W.ok?' checked':'')+'><span>Мне 18+, фото и голос мои</span></label>';
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
