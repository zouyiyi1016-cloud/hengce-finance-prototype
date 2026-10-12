const pages = document.querySelectorAll('.page');
const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('pageTitle');
const sidebar = document.querySelector('.sidebar');
function openPage(id){
  pages.forEach(p=>p.classList.toggle('active',p.id===id));
  navItems.forEach(n=>n.classList.toggle('active',n.dataset.page===id));
  const page=document.getElementById(id); pageTitle.textContent=page?.dataset.title||'经营驾驶舱';
  sidebar.classList.remove('open'); window.scrollTo({top:0,behavior:'smooth'});
}
navItems.forEach(n=>n.addEventListener('click',()=>openPage(n.dataset.page)));
document.querySelectorAll('[data-goto]').forEach(b=>b.addEventListener('click',()=>openPage(b.dataset.goto)));
document.getElementById('mobileMenu').addEventListener('click',()=>sidebar.classList.toggle('open'));
const modal=document.getElementById('expenseModal');
['quickRecord','newExpense'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>modal.classList.add('open')));
document.querySelectorAll('.modal-close').forEach(b=>b.addEventListener('click',()=>modal.classList.remove('open')));
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
function toast(msg){const t=document.getElementById('toast');document.getElementById('toastText').textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)}
document.getElementById('expenseForm').addEventListener('submit',e=>{e.preventDefault();const amount=Number(document.getElementById('amount').value).toLocaleString('zh-CN',{minimumFractionDigits:2});const reason=document.getElementById('expenseReason').value;const row=document.createElement('tr');row.innerHTML=`<td>BX20261012009</td><td><b>陈念</b><small>管理中心</small></td><td>${reason.slice(0,8)}</td><td><b>¥ ${amount}</b></td><td>刚刚</td><td><span class="status pending">审批中</span></td><td><button class="text-action">查看</button></td>`;document.getElementById('expenseRows').prepend(row);modal.classList.remove('open');e.target.reset();openPage('expense');toast('报销单已提交，审批人将收到通知')});
document.getElementById('approveBtn').addEventListener('click',()=>{document.getElementById('approveBtn').disabled=true;document.getElementById('approveBtn').textContent='已审批';toast('审批已通过，费用数据已同步经营报表')});
document.getElementById('rejectBtn').addEventListener('click',()=>toast('已退回申请人修改'));
document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open')});
