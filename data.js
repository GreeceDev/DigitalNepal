/* DigitalNepal – translations, departments and demo data */
const I18N={
en:{logout:"Log out",govnp:"Government of Nepal",heroTitle:"Every officer, one trusted record.",heroSub:"Manage employees, leave, transfers and reports in one place.",username:"Username / Employee ID",password:"Password",login:"Log in",demo:"Demo — Admin: admin / admin123 · Employee: EMP-001 / emp123",bad:"Wrong username or password.",
dash:"Dashboard",dir:"Directory",att:"Attendance",leave:"Leave",rep:"Reports",me:"My profile",
total:"Total staff",active:"Active",retired:"Retired",onLeave:"On leave today",pending:"Pending leave requests",
search:"Search by name or ID…",allDept:"All departments",add:"Add employee",edit:"Edit",del:"Delete",save:"Save changes",cancel:"Cancel",close:"Close",
nameEn:"Full name (English)",nameNe:"Full name (नेपाली)",empId:"Employee ID",desigEn:"Designation (English)",desigNe:"Designation (नेपाली)",dept:"Department",phone:"Phone",email:"Email",qual:"Qualification",joined:"Joining date",dob:"Date of birth",status:"Status",photo:"Photo",
st_active:"Active",st_retired:"Retired",st_transferred:"Transferred",
history:"Service history",addHist:"Record transfer / promotion",type:"Type",transfer:"Transfer",promotion:"Promotion",appointment:"Appointment",date:"Date",note:"Note / office",newDesig:"New designation (optional)",newDept:"New department",
confirmDel:"Delete this employee record?",
checkIn:"Check in",checkOut:"Check out",today:"Today",in:"In",out:"Out",present:"Present",absent:"Absent",onl:"On leave",name:"Name",
reqLeave:"Request leave",ltype:"Leave type",from:"From",to:"To",reason:"Reason",sick:"Sick leave",home:"Home leave",casual:"Casual leave",mat:"Maternity / paternity",
lst_pending:"Pending",lst_approved:"Approved",lst_rejected:"Rejected",approve:"Approve",reject:"Reject",action:"Action",
sanctioned:"Sanctioned posts",filled:"Filled",vacant:"Vacant",retireSoon:"Retiring within 2 years (age 58)",noneYet:"Nothing here yet.",transfers:"Transfers & promotions",
print:"Print",printP:"Print (Preeti)",csv:"Export CSV",note:"Write a note…",contact:"Contact",welcome:"Namaste",
preetiHelp:"Preeti printing needs the Preeti font installed on this computer; complex conjuncts should be checked."},
ne:{logout:"बाहिर निस्कनुहोस्",govnp:"नेपाल सरकार",heroTitle:"हरेक कर्मचारी, एउटै भरपर्दो अभिलेख।",heroSub:"कर्मचारी, बिदा, सरुवा र प्रतिवेदन एकै ठाउँबाट व्यवस्थापन गर्नुहोस्।",username:"प्रयोगकर्ता नाम / कर्मचारी आईडी",password:"पासवर्ड",login:"लगइन",demo:"डेमो — प्रशासक: admin / admin123 · कर्मचारी: EMP-001 / emp123",bad:"प्रयोगकर्ता नाम वा पासवर्ड मिलेन।",
dash:"ड्यासबोर्ड",dir:"निर्देशिका",att:"हाजिरी",leave:"बिदा",rep:"प्रतिवेदन",me:"मेरो विवरण",
total:"कुल कर्मचारी",active:"कार्यरत",retired:"सेवानिवृत्त",onLeave:"आज बिदामा",pending:"प्रतीक्षारत बिदा अनुरोध",
search:"नाम वा आईडीले खोज्नुहोस्…",allDept:"सबै विभाग",add:"कर्मचारी थप्नुहोस्",edit:"सम्पादन",del:"मेटाउनुहोस्",save:"परिवर्तन सुरक्षित गर्नुहोस्",cancel:"रद्द",close:"बन्द",
nameEn:"पूरा नाम (English)",nameNe:"पूरा नाम (नेपाली)",empId:"कर्मचारी आईडी",desigEn:"पद (English)",desigNe:"पद (नेपाली)",dept:"विभाग",phone:"फोन",email:"इमेल",qual:"योग्यता",joined:"नियुक्ति मिति",dob:"जन्म मिति",status:"अवस्था",photo:"फोटो",
st_active:"कार्यरत",st_retired:"सेवानिवृत्त",st_transferred:"सरुवा भएको",
history:"सेवा इतिहास",addHist:"सरुवा / बढुवा अभिलेख",type:"प्रकार",transfer:"सरुवा",promotion:"बढुवा",appointment:"नियुक्ति",date:"मिति",note:"टिप्पणी / कार्यालय",newDesig:"नयाँ पद (ऐच्छिक)",newDept:"नयाँ विभाग",
confirmDel:"यो कर्मचारी अभिलेख मेटाउने?",
checkIn:"हाजिर (भित्र)",checkOut:"बिदा (बाहिर)",today:"आज",in:"प्रवेश",out:"प्रस्थान",present:"उपस्थित",absent:"अनुपस्थित",onl:"बिदामा",name:"नाम",
reqLeave:"बिदा माग्नुहोस्",ltype:"बिदाको प्रकार",from:"देखि",to:"सम्म",reason:"कारण",sick:"बिरामी बिदा",home:"घर बिदा",casual:"कैफियत बिदा",mat:"प्रसूति / पितृत्व",
lst_pending:"प्रतीक्षारत",lst_approved:"स्वीकृत",lst_rejected:"अस्वीकृत",approve:"स्वीकृत",reject:"अस्वीकार",action:"कार्य",
sanctioned:"दरबन्दी",filled:"पूर्ति",vacant:"रिक्त",retireSoon:"२ वर्षभित्र अवकाश (उमेर ५८)",noneYet:"अहिलेसम्म केही छैन।",transfers:"सरुवा र बढुवा",
print:"प्रिन्ट",printP:"प्रिन्ट (प्रीति)",csv:"CSV निर्यात",note:"टिप्पणी लेख्नुहोस्…",contact:"सम्पर्क",welcome:"नमस्ते",
preetiHelp:"प्रीति प्रिन्टका लागि कम्प्युटरमा Preeti फन्ट स्थापना गरिएको हुनुपर्छ; संयुक्त अक्षर जाँच गर्नुहोस्।"}};
const DEPTS=[
{k:"adm",en:"Administration",ne:"प्रशासन",posts:4},
{k:"fin",en:"Finance & Accounts",ne:"आर्थिक प्रशासन",posts:3},
{k:"eng",en:"Engineering",ne:"इन्जिनियरिङ",posts:4},
{k:"hea",en:"Health Services",ne:"स्वास्थ्य सेवा",posts:3},
{k:"edu",en:"Education",ne:"शिक्षा",posts:3}];
const SEED={emps:[
{id:"EMP-001",nameEn:"Sita Sharma",nameNe:"सीता शर्मा",desigEn:"Under Secretary",desigNe:"उपसचिव",dept:"adm",phone:"9841000001",email:"sita@gov.np",qual:"MA Public Administration",joined:"2012-04-15",dob:"1980-06-10",status:"active",photo:"",hist:[{type:"appointment",date:"2012-04-15",note:"Section Officer, Kathmandu"},{type:"promotion",date:"2019-07-01",note:"Under Secretary"}]},
{id:"EMP-002",nameEn:"Ram Bahadur Thapa",nameNe:"राम बहादुर थापा",desigEn:"Senior Accountant",desigNe:"वरिष्ठ लेखापाल",dept:"fin",phone:"9841000002",email:"ram@gov.np",qual:"BBS",joined:"2008-01-20",dob:"1968-11-02",status:"active",photo:"",hist:[{type:"appointment",date:"2008-01-20",note:"Accountant, Biratnagar"}]},
{id:"EMP-003",nameEn:"Anita Rai",nameNe:"अनिता राई",desigEn:"Civil Engineer",desigNe:"सिभिल इन्जिनियर",dept:"eng",phone:"9841000003",email:"anita@gov.np",qual:"BE Civil",joined:"2016-09-05",dob:"1988-02-25",status:"active",photo:"",hist:[{type:"appointment",date:"2016-09-05",note:"Itahari Sub-Metropolitan"},{type:"transfer",date:"2021-03-12",note:"Dhankuta office"}]},
{id:"EMP-004",nameEn:"Hari Prasad Poudel",nameNe:"हरि प्रसाद पौडेल",desigEn:"Health Officer",desigNe:"स्वास्थ्य अधिकृत",dept:"hea",phone:"9841000004",email:"hari@gov.np",qual:"MPH",joined:"2005-06-01",dob:"1967-08-14",status:"active",photo:"",hist:[{type:"appointment",date:"2005-06-01",note:"District Health Office"}]},
{id:"EMP-005",nameEn:"Kamala Gurung",nameNe:"कमला गुरुङ",desigEn:"Education Officer",desigNe:"शिक्षा अधिकृत",dept:"edu",phone:"9841000005",email:"kamala@gov.np",qual:"M.Ed",joined:"2010-10-10",dob:"1983-12-30",status:"active",photo:"",hist:[{type:"appointment",date:"2010-10-10",note:"Sunsari Education Office"}]},
{id:"EMP-006",nameEn:"Bishnu Karki",nameNe:"विष्णु कार्की",desigEn:"Section Officer",desigNe:"शाखा अधिकृत",dept:"adm",phone:"9841000006",email:"bishnu@gov.np",qual:"MA",joined:"1990-05-05",dob:"1965-01-01",status:"retired",photo:"",hist:[{type:"appointment",date:"1990-05-05",note:"Clerk"}]}],
leaves:[{id:1,emp:"EMP-002",type:"sick",from:"2026-10-19",to:"2026-10-21",reason:"Fever",status:"pending"}],
att:[]};
/* Unicode → Preeti (basic) for printing on traditional paperwork */
const PREETI={"क":"s","ख":"v","ग":"u","घ":"3","ङ":"ª","च":"r","छ":"5","ज":"h","झ":"´","ञ":"`","ट":"6","ठ":"7","ड":"8","ढ":"9","ण":"0","त":"t","थ":"y","द":"b","ध":"w","न":"g","प":"k","फ":"m","ब":"a","भ":"e","म":"d","य":"o","र":"/","ल":"n","व":"j","श":"z","ष":"if","स":";","ह":"x","अ":"c","आ":"cf","इ":"O","ई":"O{","उ":"p","ऊ":"pm","ए":"P","ऐ":"P]","ओ":"cf]","औ":"cf}","ा":"f","ी":"L","ु":"'","ू":'"',"ृ":"[","े":"]","ै":"}","ो":"f]","ौ":"f}","ं":"+","ः":":","ँ":"F","्":"","।":".","०":"0","१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9"};
function toPreeti(s){let o="",c=[...s];for(let i=0;i<c.length;i++){const ch=c[i];if(c[i+1]==="ि"&&PREETI[ch]&&/[क-ह]/.test(ch)){o+="l"+PREETI[ch];i++}else o+=ch==="ि"?"l":(PREETI[ch]??ch)}return o}
