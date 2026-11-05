function mask(v){return String(v??'').replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,'[masked-email]').replace(/(?<![A-Za-z0-9])(?:\+?\d[\d ()-]{7,}\d)(?![A-Za-z0-9])/g,m=>{const d=m.replace(/\D/g,'');return d.length>=10&&d.length<=15?'[masked-phone]':m;});}
let internal=false;try{internal=$('INTERNAL EVAL - never public').first().json.eval_mode===true;}catch{}
const question=mask(String(internal?$json.question:($json.chatInput||'')).trim());
const session=String($json.sessionId||'').slice(0,150);
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16).padStart(8,'0');}
const day=new Date().toISOString().slice(0,10);const request_id='K3-'+hash(day+'|'+session+'|'+question.toLowerCase())+'-'+hash(question+'|'+session+'|'+day);
let blocked='',reason='';
if(!question||question.length>3000){blocked='Please send a Kaapi support question of 1 to 3000 characters.';reason='input_size';}
else if(/(?:ignore|override|forget|disregard).{0,35}(?:instructions|system|rules)|(?:reveal|print|show|give).{0,30}(?:system prompt|api key|password|secret)|(?:act as|you are now).{0,25}(?:admin|developer|system)/i.test(question)){blocked='I cannot change support rules or reveal credentials. Please ask a Kaapi order, coffee or policy question. Team Kaapi';reason='instruction_override';}
else if(/\b(?:IPL|cricket winner|stock tips|write malware|political party)\b/i.test(question)&&! /\b(?:kaapi|coffee|order|refund|delivery)\b/i.test(question)){blocked='I can help with Kaapi coffee, orders and support policies. Please ask a question about those. Team Kaapi';reason='off_topic';}
return [{json:{question,request_id,eval_mode:internal,started_ms:Date.now(),blocked:Boolean(blocked),guard_reason:reason,output:blocked}}];
