const object=v=>{if(v&&typeof v==='object'&&!Array.isArray(v))return v;if(typeof v==='string'&&v.length<=30000){try{const p=JSON.parse(v.trim().replace(/^```(?:json)?\s*|\s*```$/g,''));return p&&typeof p==='object'&&!Array.isArray(p)?p:null;}catch{}}return null;};
const queue=[{value:object($json),depth:0}],seen=new Set(),candidates=[];
while(queue.length){const {value:v,depth}=queue.shift();if(!v||seen.has(v))continue;seen.add(v);candidates.push(v);if(depth<4)for(const key of ['input','query','ticket','json']){const p=object(v[key]);if(p)queue.push({value:p,depth:depth+1});}}
const keys=['summary','draft_reply','priority','category'];
const score=v=>keys.filter(k=>typeof v[k]==='string'&&v[k].trim()).length;
const x=candidates.sort((a,b)=>score(b)-score(a))[0]||{};
const clean=k=>typeof x[k]==='string'?x[k].trim():'';
const ticket={summary:clean('summary'),priority:clean('priority').toLowerCase(),category:clean('category').toLowerCase(),draft_reply:clean('draft_reply')};
const missing=keys.filter(k=>!ticket[k]);const invalid=[];
if(ticket.category&&!['refund','delivery','product','other'].includes(ticket.category))invalid.push('category must be refund, delivery, product or other');
if(ticket.priority&&!['normal','high'].includes(ticket.priority))invalid.push('priority must be normal or high');
if(ticket.summary.length>3000||ticket.draft_reply.length>6000)invalid.push('summary/draft exceeds workshop size limit');
if(missing.length||invalid.length)return [{json:{valid:false,ok:false,error:'missing_or_invalid_ticket_inputs',missing_fields:missing,invalid_fields:invalid,input_received_keys:Object.keys($json||{}),ticket_saved:false,slack_notified:false,refund_approved:false,customer_email_sent:false,message:'Ticket NOT saved. Use BOTH v4.0.3 files: the helper trigger must Accept all data, and 03 create_ticket must point to that published helper with no four-field mappings. Do not mix an old agent with this helper. Test from 03 Open chat. Use TEST HELPER for the explicit standalone sample.',output:'Ticket NOT saved. Missing: '+(missing.join(', ')||'none')+'. '+invalid.join('; ')}}];
const order_id=(typeof x.order_id==='string'?x.order_id.toUpperCase().match(/\bKC\d{4}\b/):null)?.[0]||ticket.summary.toUpperCase().match(/\bKC\d{4}\b/)?.[0]||null;
return [{json:{valid:true,ticket:{...ticket,order_id}}}];
