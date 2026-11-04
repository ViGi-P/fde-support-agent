function assessRefund(order, evidence) {
  const approval_required=Number(order.amount_inr)>5000;
  const base={order_id:order.order_id,amount_inr:order.amount_inr,approval_required,refund_approved:false,policy_sources:['policies.md#Returns','policies.md#Approval rule'],evidence_source:'day2/refund-evidence.json (fictional)' };
  const needs=(reason)=>({...base,eligibility:'needs_information',reason});
  if(order.status!=='delivered')return needs('No confirmed delivery. Check delivery and the issue before assessing a return.');
  if(!evidence?.delivered_at||!evidence?.reported_at)return needs('Delivery date and report date are not available. Ask for evidence; do not infer them from order_date.');
  const hours=(new Date(evidence.reported_at)-new Date(evidence.delivered_at))/3600000;
  if(!Number.isFinite(hours)||hours<0)return needs('Delivery/report dates are invalid.');
  let eligible,reason;
  if(evidence.unopened===true){eligible=hours<=7*24;reason=eligible?'Unopened item reported within 7 days.':'Unopened return is outside 7 days.';}
  else if(evidence.arrived_damaged===true){
    if(hours>48){eligible=false;reason='Damage reported after 48 hours.';}
    else if(evidence.photo_provided===true){eligible=true;reason='Arrival damage reported within 48 hours with a photo.';}
    else return needs('A photo is required for a damage claim.');
  } else if(evidence.unopened===false&&evidence.arrived_damaged===false){eligible=false;reason='Opened bags are returnable only for arrival damage reported within 48 hours with a photo.';}
  else return needs('Unopened/damaged state is not established.');
  return {...base,eligibility:eligible?'eligible_for_review':'not_eligible',reason,hours_since_delivery:hours,next_action:!eligible?'Explain the policy; offer human review if disputed.':approval_required?'Human approval required before any refund.':'Support may review this request; no refund has been issued.'};
}
