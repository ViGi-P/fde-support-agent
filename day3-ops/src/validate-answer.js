function mask(v){return String(v??'').replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,'[masked-email]').replace(/(?<![A-Za-z0-9])(?:\+?\d[\d ()-]{7,}\d)(?![A-Za-z0-9])/g,m=>{const d=m.replace(/\D/g,'');return d.length>=10&&d.length<=15?'[masked-phone]':m;});}function obj(v){for(let i=0;i<5;i++){if(typeof v==='string'){const t=v.trim().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');try{v=JSON.parse(t);}catch{return null;}}else if(v&&typeof v==='object'&&!Array.isArray(v)){if(v.output&&typeof v.output==='object'&&!v.answer&&!v.summary){v=v.output;continue;}if(v.input&&!v.summary){v=v.input;continue;}return v;}else return null;}return null;}
const g=$('1. Input guard and PII mask').first().json;
const p=obj($json.output);const trace=$json.intermediateSteps||[];
let valid=p&&typeof p.answer==='string'&&p.answer.trim().length>0&&p.answer.length<=5000&&['refund','delivery','product','other'].includes(p.category)&&typeof p.needs_ticket==='boolean'&&typeof p.summary==='string'&&typeof p.order_id==='string'&&Array.isArray(p.sources);
const observed=trace.map(t=>({tool:t.action?.tool||t.tool||'',result:String(t.observation||'')}));
const refund=(g.question.match(/\b(refund|money back|return|paise|wapas)\b/i)||p?.category==='refund');
const supplied=(g.question.match(/\bKC\d{4}\b/i)||[])[0]?.toUpperCase()||'';
let eligibility=null;for(const s of observed){if(s.tool.includes('check_refund_eligibility')){let text=s.result;try{let a=JSON.parse(text);if(Array.isArray(a)&&a[0]?.text)a=JSON.parse(a[0].text);if(a.content?.[0]?.text)a=JSON.parse(a.content[0].text);if(a.order_id)eligibility=a;}catch{const m=text.match(/\{[\s\S]*\}/);try{eligibility=JSON.parse(m?.[0]);}catch{}}}}
if(p?.order_id&&p.order_id.toUpperCase()!==supplied)valid=false;
if(refund&&supplied&&!eligibility)valid=false;
const validation_error=!$json.output?'model_missing_output':!p?'model_not_json':(p?.order_id&&p.order_id.toUpperCase()!==supplied)?'order_id_mismatch':(refund&&supplied&&!eligibility)?'missing_refund_evidence':!valid?'response_schema_mismatch':null;
if(!valid)return[{json:{...g,valid:false,needs_ticket:false,...(g.eval_mode?{validation_error,tools_used:observed.map(s=>s.tool),retrieved_chunks:observed.filter(s=>s.tool.includes('search_knowledge')).map(s=>s.result)}:{}),output:'I could not verify a safe answer just now. Please try again or contact the support team. No ticket or refund has been confirmed. Team Kaapi',sources:[],error_code:'unsafe_or_invalid_model_output',latency_ms:Date.now()-g.started_ms}}];
const knownSources=new Set();for(const s of observed){const matches=s.result.matchAll(/(?:policies\.md|faq\.md)#[^"\\\n\r]+/g);for(const m of matches)knownSources.add(m[0]);}
const sources=p.sources.filter(s=>typeof s==='string'&&[...knownSources].some(k=>k===s||k.startsWith(s))).slice(0,6);
let answer=mask(p.answer.trim());let needs_ticket=p.needs_ticket&&!g.eval_mode;
if(p.category==='other')needs_ticket=false;
if(refund&&!supplied)needs_ticket=false;
if(eligibility?.approval_required===true){answer=answer.replace(/(?:your )?refund (?:has been |is )?(?:approved|issued|processed)/gi,'refund request requires human approval');}
return[{json:{...g,valid:true,output:answer,answer,category:p.category,summary:mask(p.summary).slice(0,500),draft_reply:answer,order_id:supplied,needs_ticket,sources,approval_required:eligibility?.approval_required===true,eligibility:eligibility?.eligibility||'',refund_approved:false,customer_email_sent:false,latency_ms:Date.now()-g.started_ms,model_tokens:$json.tokenUsage||$json.usageMetadata||null,tools_used:observed.map(s=>s.tool),retrieved_chunks:observed.filter(s=>s.tool.includes('search_knowledge')).map(s=>s.result)}}];
