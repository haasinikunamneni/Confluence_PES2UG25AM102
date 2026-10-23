(() => {
 const stages=[
  {id:'registration',title:'Registration',status:'unavailable',date:null,prerequisites:'Official registration dates have not been supplied.',detail:'Registration details and the official form destination will be configured here.',action:'Return home',href:'/'},
  {id:'teams',title:'Team formation',status:'upcoming',date:null,prerequisites:'Registration rules to be confirmed.',detail:'Example stage: form a team and confirm participant details.',action:'Participant demo',href:'/portal.html'},
  {id:'build',title:'Build period',status:'upcoming',date:null,prerequisites:'Team registration and confirmed event schedule.',detail:'Example stage: develop and test a solution against the chosen challenge.',action:'Explore themes',href:'/themes'},
  {id:'submission',title:'Submission',status:'unavailable',date:null,prerequisites:'Submission requirements and deadline are not configured.',detail:'The submission process will be added when official instructions are available.',action:'Announcement centre',href:'/announcements'},
  {id:'verification',title:'Component verification',status:'upcoming',date:null,prerequisites:'Submission workflow to be confirmed.',detail:'Example stage: check required deliverables and submission completeness.',action:'Organizer demo',href:'/admin.html'},
  {id:'judging',title:'Judging',status:'upcoming',date:null,prerequisites:'Published judging rubric and schedule.',detail:'Example stage: assess projects using the published criteria.',action:'View announcements',href:'/announcements'},
  {id:'results',title:'Results',status:'unavailable',date:null,prerequisites:'Official results publication date not supplied.',detail:'Results will be published after organisers confirm them.',action:'Return home',href:'/'}
 ];
 const icons={upcoming:'◷',active:'◉',completed:'✓',delayed:'!',unavailable:'—'};
 const list=document.querySelector('#roadmap-list'),filter=document.querySelector('#roadmap-filter'); if(!list)return;
 function render(){const f=filter.value;const visible=stages.filter(s=>f==='all'||s.status===f);list.innerHTML=visible.map((s,i)=>`<article class="roadmap-item status-${s.status}"><div class="roadmap-marker" aria-hidden="true">${icons[s.status]}</div><div class="roadmap-copy"><div class="roadmap-meta"><span class="status-label">${s.status}</span><span>${s.date||'Date to be announced'}</span></div><h2>${s.title}</h2><p>${s.detail}</p><details><summary>Prerequisites & details</summary><p>${s.prerequisites}</p></details><a href="${s.href}">${s.action} ↗</a></div></article>`).join('')||'<p>No stages match this filter.</p>';}
 filter.addEventListener('change',render);render();
})();
