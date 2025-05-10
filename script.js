let mode = 'normal'; // default mode
let teamPickedHistory = {
  blue: [],
  red: []
};
let bannedInFearlessMode = []; // Heroes that are banned in fearless mode
let pendingHero = null;
let filterMode = 'role'; // atau 'lane'

const defaultHeroes = [
  { name: 'Amon', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Akai', role: 'Tank', lanes: ['Clash Lane', 'Jungler', 'Roamer'] },
  { name: 'Aldous', role: 'Fighter', lanes: ['Clash Lane'] },
  { name: 'Alice', role: 'Mage', lanes: ['Clash Lane'] },
  { name: 'Alpha', role: 'Fighter', lanes: ['Jungler'] },
  { name: 'Alucard', role: 'Fighter', lanes: ['Clash Lane','Jungler'] },
  { name: 'Argus', role: 'Fighter', lanes: ['Clash Lane'] },
  { name: 'Angela', role: 'Support', lanes: ['Roamer'] },
  { name: 'Arlott', role: 'Fighter', lanes: ['Roamer', 'Clash Lane'] },
  { name: 'Atlas', role: 'Tank', lanes: ['Roamer'] },
  { name: 'Aulus', role: 'Fighter', lanes: ['Jungler'] },
  { name: 'Aurora', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Badang', role: 'Fighter', lanes: ['Clash Lane', 'Roamer'] },
  { name: 'Balmond', role: 'Tank', lanes: ['Jungler', 'Clash Lane'] },
  { name: 'Bane', role: 'Fighter', lanes: ['Jungler', 'Clash Lane'] },
  { name: 'Barats', role: 'Tank', lanes: ['Jungler', 'Clash Lane'] },
  { name: 'Baxia', role: 'Tank', lanes: ['Jungler', 'Roamer'] },
  { name: 'Beatrix', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Belerick', role: 'Tank', lanes: ['Roamer', 'Clash Lane'] },
  { name: 'Benedetta', role: 'Assassin', lanes: ['Clash Lane','Jungler'] },
  { name: 'Brody', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Bruno', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Carmilla', role: 'Support', lanes: ['Roamer'] },
  { name: 'Cecillion', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Change', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Chou', role: 'Fighter', lanes: ['Clash Lane', 'Roamer'] },
  { name: 'Chip', role: 'Tank', lanes: ['Roamer'] },
  { name: 'Cici', role: 'Fighter', lanes: ['Clash Lane'] },
  { name: 'Claude', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Clint', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Diggie', role: 'Support', lanes: ['Roamer', 'Midlane'] },
  { name: 'Cyclops', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Dyrroth', role: 'Fighter', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Edith', role: 'Tank', lanes: ['Roamer', 'Clash Lane'] },
  { name: 'Esmeralda', role: 'Tank', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Estes', role: 'Support', lanes: ['Roamer'] },
  { name: 'Fanny', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Faramis', role: 'Support', lanes: ['Midlane', 'Roamer'] },
  { name: 'Eudora', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Florin', role: 'Support', lanes: ['Roamer'] },
  { name: 'Freya', role: 'Fighter', lanes: ['Farm Lane', 'Clash Lane', 'Jungler'] },
  { name: 'Franco', role: 'Tank', lanes: ['Roamer'] },
  { name: 'Gatotkaca', role: 'Tank', lanes: ['Clash Lane', 'Roamer'] },
  { name: 'Fredrinn', role: 'Tank', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Granger', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Gord', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Gloo', role: 'Tank', lanes: ['Clash Lane'] },
  { name: 'Grock', role: 'Tank', lanes: ['Clash Lane','Roamer'] },
  { name: 'Guinivere', role: 'Fighter', lanes: ['Clash Lane','Jungler'] },
  { name: 'Hanabi', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Hanzo', role: 'Assassin', lanes: [ 'Jungler'] },
  { name: 'Gusion', role: 'Assassin', lanes: ['Jungler', 'Midlane'] },
  { name: 'Harith', role: 'Mage', lanes: ['Jungler', 'Farm Lane', 'Midlane'] },
  { name: 'Harley', role: 'Mage', lanes: ['Midlane', 'Jungler'] },
  { name: 'Irithel', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Hylos', role: 'Tank', lanes: ['Clash Lane', 'Roamer'] },
  { name: 'Hilda', role: 'Tanl', lanes: ['Clash Lane', 'Roamer'] },
  { name: 'Hayabusa', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Helcurt', role: 'Assassin', lanes: ['Roamer', 'Jungler'] },
  { name: 'Ixia', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Joy', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Jawhead', role: 'Fighter', lanes: ['Clash Lane', 'Jungler', 'Roamer'] },
  { name: 'Julian', role: 'Fighter', lanes: ['Clash Lane','Midlane','Jungler'] },
  { name: 'Johnson', role: 'Tank', lanes: ['Roamer'] },
  { name: 'Kadita', role: 'Mage', lanes: ['Midlane', 'Roamer'] },
  { name: 'Karina', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Kaja', role: 'Fighter', lanes: ['Clash Lane','Roamer'] },
  { name: 'Kalea', role: 'Support', lanes: ['Clash Lane', 'Roamer'] },
  { name: 'Kagura', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Karrie', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Khaleed', role: 'Fighter', lanes: ['Clash Lane', 'Roamer'] },
  { name: 'Lancelot', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Kimmy', role: 'Mage', lanes: ['Midlane', 'Farm Lane'] },
  { name: 'Khufra', role: 'Tank', lanes: ['Roamer'] },
  { name: 'Ling', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Lolita', role: 'Tank', lanes: ['Roamer'] },
  { name: 'Lapu Lapu', role: 'Fighter', lanes: ['Clash Lane'] },
  { name: 'Lukas', role: 'Fighter', lanes: ['Jungler','Clash Lane'] },
  { name: 'Leomord', role: 'Fighter', lanes: ['Jungler','Clash Lane'] },
  { name: 'Lesley', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Layla', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Lunox', role: 'Mage', lanes: ['Farm Lane','Midlane'] },
  { name: 'Luo Yi', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Lylia', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Minotaur', role: 'Tank', lanes: ['Roamer'] },
  { name: 'Mathilda', role: 'Support', lanes: ['Roamer','Midlane'] },
  { name: 'Martis', role: 'Fighter', lanes: ['Clash Lane','Jungler'] },
  { name: 'Masha', role: 'Fighter', lanes: ['Clash Lane'] },
  { name: 'Melissa', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Minsitthar', role: 'Fighter', lanes: ['Clash Lane', 'Roamer'] },
  { name: 'Miya', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Moskov', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Nana', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Natalia', role: 'Assassin', lanes: ['Roamer'] },
  { name: 'Nolan', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Novaria', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Natan', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Odette', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Phoveus', role: 'Tank', lanes: ['Clash Lane'] },
  { name: 'Rafaela', role: 'Support', lanes: ['Roamer'] },
  { name: 'Popol', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Roger', role: 'Fighter', lanes: ['Jungler', 'Farm Lane'] },
  { name: 'Pharsa', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Selena', role: 'Mage', lanes: ['Midlane','Roamer'] },
  { name: 'Silvanna', role: 'Fighter', lanes: ['Clash Lane'] },
  { name: 'Ruby', role: 'Fighter', lanes: ['Clash Lane', 'Roamer'] },
  { name: 'Saber', role: 'Assassin', lanes: ['Jungler','Roamer'] },
  { name: 'Sun', role: 'Assassin', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Suyou', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Terizla', role: 'Tank', lanes: ['Clash Lane'] },
  { name: 'Thamuz', role: 'Fighter', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Tigreal', role: 'Tank', lanes: ['Roamer'] },
  { name: 'Uranus', role: 'Tank', lanes: ['Clash Lane'] },
  { name: 'Valentina', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Vale', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Valir', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Vexana', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Wanwan', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Paquito', role: 'Fighter', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'xborg', role: 'Fighter', lanes: ['Clash Lane','Jungler'] },
  { name: 'Yi Sunshin', role: 'Archer', lanes: ['Jungler'] },
  { name: 'Xavier', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Yu Zhong', role: 'Tank', lanes: ['Clash Lane'] },
  { name: 'Yin', role: 'Fighter', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Yve', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Zhuxin', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Zhask', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Zilong', role: 'Fighter', lanes: ['Clash Lane', 'Jungler'] },
];

const mlbbHeroes = [...defaultHeroes]; // tetap gunakan default

const hokHeroes = [
  { name: 'Lu Bu', role: 'Fighter', lanes: ['Clash Lane'] },
  { name: 'Mulan', role: 'Fighter', lanes: ['Clash Lane'] },
  { name: 'Sun Bin', role: 'Support', lanes: ['Roamer'] },
  { name: 'Zhou Yu', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Diao Chan', role: 'Mage', lanes: ['Midlane', 'Clash Lane'] },
  { name: 'Arthur', role: 'Tank', lanes: ['Clash Lane', 'Roamer', 'Jungler'] },
  { name: 'Yao', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Zhang Fei', role: 'Tank', lanes: ['Roamer'] },
  { name: 'Han Xin', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Jing', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Luna', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Marcopolo', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Luban', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Cai Yan', role: 'Support', lanes: ['Roamer'] },
  { name: 'Angela', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Zilong', role: 'Fighter', lanes: ['Jungler', 'Clash Lane'] },
  { name: 'Sun Ce', role: 'Fighter', lanes: ['Jungler', 'Clash Lane'] },
  { name: 'Mozi', role: 'Tank', lanes: ['Roamer', 'Midlane'] },
  { name: 'Lam', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Heino', role: 'Mage', lanes: ['Clash Lane', 'Midlane', 'Jungler'] },
  { name: 'Dolia', role: 'Support', lanes: ['Roamer'] },
  { name: 'Arli', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Mayene', role: 'Fighter', lanes: ['Clash Lane'] },
  { name: 'Li Xin', role: 'Fighter', lanes: ['Clash Lane', 'Jungler', 'Farm Lane'] },
  { name: 'Mai', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Biron', role: 'Fighter', lanes: ['Clash Lane'] },
  { name: 'Cao Cao', role: 'Fighter', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Mi Yue', role: 'Mage', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Wu Yan', role: 'Fighter', lanes: ['Clash Lane', 'Jungler', 'Roamer'] },
  { name: 'Zhen', role: 'Fighter', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Master Luban', role: 'Support', lanes: ['Roamer'] },
  { name: 'Shi', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Sakeer', role: 'Support', lanes: ['Roamer'] },
  { name: 'Ziya', role: 'Mage', lanes: ['Roamer', 'Midlane'] },
  { name: 'Athena', role: 'Fighter', lanes: ['Roamer', 'Jungler'] },
  { name: 'Arke', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Charlotte', role: 'Fighter', lanes: ['Jungler', 'Clash Lane'] },
  { name: 'Huaizhen', role: 'Fighter', lanes: ['Clash Lane'] },
  { name: 'Gao', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Zhuangzi', role: 'Tank', lanes: ['Roamer'] },
  { name: 'Geya', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Shieldun', role: 'Tank', lanes: ['Roamer'] },
  { name: 'Su Lie', role: 'Tank', lanes: ['Clash Lane', 'Roamer'] },
  { name: 'Erin', role: 'Archer', lanes: ['Farm Lane', 'Midlane'] },
  { name: 'Fang', role: 'Archer', lanes: ['Farm Lane', 'Jungler'] },
  { name: 'Feyd', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Cirrus', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Loong', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Dharma', role: 'Fighter', lanes: ['Clash Lane'] },
  { name: 'Garo', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Agudo', role: 'Archer', lanes: ['Farm Lane', 'Jungler'] },
  { name: 'Pei', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Yaria', role: 'Support', lanes: ['Roamer'] },
  { name: 'Mushasi', role: 'Fighter', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Di Renji', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Menki', role: 'Tank', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Nezha', role: 'Fighter', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Meng Ya', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Liu Shan', role: 'Tank', lanes: ['Roamer'] },
  { name: 'Meng Tian', role: 'Tank', lanes: ['Clash Lane'] },
  { name: 'Pangu', role: 'Fighter', lanes: ['Jungler'] },
  { name: 'Ukyo', role: 'Fighter', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Yang Jian', role: 'Fighter', lanes: ['Clash Lane'] },
  { name: 'Yuan Ge', role: 'Assassin', lanes: ['Clash Lane'] },
  { name: 'Yin', role: 'Fighter', lanes: ['Jungler'] },
  { name: 'Dian Wei', role: 'Fighter', lanes: ['Jungler'] },
  { name: 'Kaizer', role: 'Fighter', lanes: ['Clash Lane','Jungler'] },
  { name: 'Dun', role: 'Tank', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Xiang Yu', role: 'Fighter', lanes: ['Clash Lane'] },
  { name: 'Liu Bei', role: 'Fighter', lanes: ['Jungler'] },
  { name: 'Guan Yu', role: 'Fighter', lanes: ['Clash Lane'] },
  { name: 'Fuzi', role: 'Fighter', lanes: ['Clash Lane'] },
  { name: 'Dr Bian', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Wukong', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Xuance', role: 'Assassin', lanes: ['Jungler', 'Roamer'] },
  { name: 'Sima Yi', role: 'Assassin', lanes: ['Jungler', 'Midlane'] },
  { name: 'Lanling', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Nakoruru', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Li Bai', role: 'Assassin', lanes: ['Jungler'] },
  { name: 'Shouyue', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Lady Sun', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Hou Yi', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Huang Zhong', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Niumo', role: 'Tank', lanes: ['Roamer'] },
  { name: 'Zhenren', role: 'Tank', lanes: ['Roamer'] },
  { name: 'Kui', role: 'Tank', lanes: ['Roamer'] },
  { name: 'Bai Qi', role: 'Tank', lanes: ['Clash Lane'] },
  { name: 'Yaojin', role: 'Tank', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Lian Po', role: 'Tank', lanes: ['Clash Lane', 'Roamer'] },
  { name: 'Zhu Bajie', role: 'Tank', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Flow Tank', role: 'Tank', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Augran', role: 'Fighter', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Allain', role: 'Fighter', lanes: ['Clash Lane'] },
  { name: 'Ma Chao', role: 'Fighter', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Shadow', role: 'Assassin', lanes: ['Clash Lane', 'Jungler'] },
  { name: 'Chano', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Da Qiao', role: 'Support', lanes: ['Roamer'] },
  { name: 'Guiguzi', role: 'Support', lanes: ['Roamer'] },
  { name: 'Donghuang', role: 'Tank', lanes: ['Roamer', 'Clash Lane'] },
  { name: 'Kong Er', role: 'Support', lanes: ['Roamer'] },
  { name: 'Dyadia', role: 'Support', lanes: ['Roamer'] },
  { name: 'Change', role: 'Tank', lanes: ['Midlane', 'Clash Lane'] },
  { name: 'Gan Mo', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Flow Mage', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Frost', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Hai Yue', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Jin Chan', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Lady Zhen', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Kongming', role: 'Mage', lanes: ['Midlane', 'Jungler'] },
  { name: 'Liang', role: 'Mage', lanes: ['Midlane', "Roamer"] },
  { name: 'Milady', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Nuwa', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Shangguan', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Ming', role: 'Support', lanes: ['Roamer'] },
  { name: 'Wu Ze Tian', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Xiao Qiao', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Ying Zheng', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Yixing', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Yuhuan', role: 'Mage', lanes: ['Midlane', 'Jungler'] },
  { name: 'Alessio', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Consort Yu', role: 'Archer', lanes: ['Farm Lane'] },
  { name: 'Daji', role: 'Mage', lanes: ['Midlane'] },
  { name: 'Liu Bang', role: 'Tank', lanes: ['Roamer', 'Clash Lane'] },
  { name: 'Mengxi', role: 'Mage', lanes: ['Midlane'] },
];

const bannedHeroes = [];
const pickedHeroes = [];

let heroes = [...mlbbHeroes];
let selectedGame = 'mlbb';
let draftSequence = [];
let currentStep = 0;
let firstPick = 'blue';
let selectedRole = 'all';
let selectedLane = 'all';
let timerInterval;
let timerSeconds = 45;

document.getElementById('startDraft').addEventListener('click', startDraft);
document.getElementById('switchFilter').addEventListener('click', () => {
  filterMode = (filterMode === 'role') ? 'lane' : 'role';

  // Tampilkan hanya satu filter
  document.getElementById('role-selector').style.display = (filterMode === 'role') ? 'flex' : 'none';
  document.getElementById('lane-selector').style.display = (filterMode === 'lane') ? 'flex' : 'none';
});

document.getElementById('resetDraft').addEventListener('click', resetDraft);
document.getElementById('showSavedDraft').addEventListener('click', loadSavedDraft);
document.getElementById('nextGame').addEventListener('click', startNextGame);



document.querySelectorAll('#role-selector button').forEach(button => {
  button.addEventListener('click', () => {
    selectedRole = button.getAttribute('data-role');
    selectedLane = 'all';
    renderHeroList();
  });
});

document.querySelectorAll('#lane-selector button').forEach(button => {
  button.addEventListener('click', () => {
    selectedLane = button.getAttribute('data-lane');
    selectedRole = 'all';
    renderHeroList();
  });
});

document.getElementById('heroSearch').addEventListener('input', renderHeroList);

function startDraft() {
  firstPick = document.getElementById('firstPick').value;
  mode = document.getElementById('modeSelector').value;
  
  // ⬇️ PINDAHKAN KE SINI
  selectedGame = document.getElementById('gameSelector').value;
  heroes = selectedGame === 'mlbb' ? [...mlbbHeroes] : [...hokHeroes];

  document.getElementById('draft-area').style.display = 'block';
  document.getElementById('phase-info').innerHTML = '<span id="phase-text"></span> - <span id="timer">45</span>s';
  
  setupDraftSequence();
  currentStep = 0;
  showPhase();
  renderHeroList();
  document.getElementById('confirm-selection').style.display = 'block';
}


function setupDraftSequence() {
  draftSequence = [];
  let first = firstPick;
  let second = (first === 'blue') ? 'red' : 'blue';

  if (first === 'blue') {
    draftSequence = [
      { action: 'ban', team: 'blue' },
      { action: 'ban', team: 'red' },
      { action: 'ban', team: 'red' },
      { action: 'ban', team: 'blue' },
      { action: 'ban', team: 'blue' },
      { action: 'ban', team: 'red' },

      { action: 'pick', team: 'blue' },
      { action: 'pick', team: 'red' },
      { action: 'pick', team: 'red' },
      { action: 'pick', team: 'blue' },
      { action: 'pick', team: 'blue' },
      { action: 'pick', team: 'red' },

      { action: 'ban', team: 'red' },
      { action: 'ban', team: 'blue' },
      { action: 'ban', team: 'red' },
      { action: 'ban', team: 'blue' },

      { action: 'pick', team: 'red' },
      { action: 'pick', team: 'blue' },
      { action: 'pick', team: 'blue' },
      { action: 'pick', team: 'red' }
    ];
  } else {
    // mirror pattern if red first pick
    draftSequence = [
      { action: 'ban', team: 'red' },
      { action: 'ban', team: 'blue' },
      { action: 'ban', team: 'blue' },
      { action: 'ban', team: 'red' },
      { action: 'ban', team: 'red' },
      { action: 'ban', team: 'blue' },

      { action: 'pick', team: 'red' },
      { action: 'pick', team: 'blue' },
      { action: 'pick', team: 'blue' },
      { action: 'pick', team: 'red' },
      { action: 'pick', team: 'red' },
      { action: 'pick', team: 'blue' },

      { action: 'ban', team: 'blue' },
      { action: 'ban', team: 'red' },
      { action: 'ban', team: 'blue' },
      { action: 'ban', team: 'red' },

      { action: 'pick', team: 'blue' },
      { action: 'pick', team: 'red' },
      { action: 'pick', team: 'red' },
      { action: 'pick', team: 'blue' }
    ];
  }
}




function renderHeroList() {
  const heroListDiv = document.getElementById('hero-list');
  heroListDiv.innerHTML = '';

  const searchQuery = document.getElementById('heroSearch')?.value.toLowerCase() || '';
  const step = draftSequence[currentStep] || { action: '', team: '' };

  heroes.forEach(hero => {
    if (selectedRole !== 'all' && hero.role !== selectedRole) return;
    if (selectedLane !== 'all' && !hero.lanes.includes(selectedLane)) return;
    if (!hero.name.toLowerCase().includes(searchQuery)) return;

    const button = document.createElement('button');
    if (pendingHero && pendingHero.name === hero.name) {
      button.classList.add('hero-pending');
    }    
    const isPicked = pickedHeroes.includes(hero.name);
    const isBanned = bannedHeroes.includes(hero.name);
    const isFearlessBanned = mode === 'fearless' && bannedInFearlessMode.includes(hero.name);

    let disabled = false;
    let disabledReason = '';

    if (isPicked || isBanned || isFearlessBanned) {
      disabled = true;
      disabledReason = isPicked ? 'Picked' : 
                      isBanned ? 'Banned' : 
                      'Fearless Banned';
    }

    if (!disabled && mode === 'global' && step.team) {
      if (step.action === 'pick' && teamPickedHistory[step.team].includes(hero.name)) {
        disabled = true;
        disabledReason = 'Not Available';
      }
    }

    if (disabled) {
      button.disabled = true;
      button.style.opacity = '0.5';
      button.style.position = 'relative';

      const label = document.createElement('div');
      label.textContent = disabledReason;
      label.style.position = 'absolute';
      label.style.top = '5px';
      label.style.left = '5px';
      label.style.background = (disabledReason === 'Picked') ? '#4da6ff' : 
                              (disabledReason === 'Banned') ? '#ff4d4d' : 
                              (disabledReason === 'Fearless Banned') ? '#ff9900' :
                              '#999';
      label.style.color = '#fff';
      label.style.padding = '2px 6px';
      label.style.borderRadius = '5px';
      label.style.fontSize = '10px';
      button.appendChild(label);
    } else {
      button.onclick = () => {
        pendingHero = hero;
        renderHeroList();
        document.getElementById('confirm-selection').style.display = 'block';
      };
    }
    

    const img = document.createElement('img');
    img.src = `images/${selectedGame}/${hero.name.toLowerCase().replace(/ /g, '-')}.png`;
    img.alt = hero.name;

    const span = document.createElement('span');
    span.textContent = hero.name;

    button.appendChild(img);
    button.appendChild(span);
    heroListDiv.appendChild(button);
  });
  document.getElementById('confirmButton').addEventListener('click', () => {
    if (!pendingHero) return;
  
    const step = draftSequence[currentStep];
    const heroName = pendingHero.name;
  
    if (step.action === 'ban') {
      if (step.team === 'blue') blueBanList.push(heroName);
      else redBanList.push(heroName);
      bannedHeroes.push(heroName);
    } 
    else if (step.action === 'pick') {
      if (step.team === 'blue') bluePickList.push(heroName);
      else redPickList.push(heroName);
      pickedHeroes.push(heroName);
  
      if (mode === 'global') {
        teamPickedHistory[step.team].push(heroName);
      }
    }
  
    pendingHero = null;
    currentStep++;
    updateTeamDisplays();
    renderHeroList();
    showPhase();
  
    if (currentStep >= draftSequence.length) {
      document.getElementById('phase-info').innerText = '';
      saveDraft();
      document.getElementById('nextGame').style.display = 'inline-block';
      enableReorder();
    }
  });
  
}





const blueBanList = [];
const redBanList = [];
const bluePickList = [];
const redPickList = [];


function updateTeamDisplays() {
  // Clear semua area
  ['blue-ban-first', 'blue-pick-first', 'blue-ban-second', 'blue-pick-second',
   'red-ban-first', 'red-pick-first', 'red-ban-second', 'red-pick-second']
  .forEach(id => document.getElementById(id).innerHTML = '');

  // Ban dan Pick per fase
  const blueBanFirst = blueBanList.slice(0, 3);
  const redBanFirst = redBanList.slice(0, 3);
  const bluePickFirst = bluePickList.slice(0, 3);
  const redPickFirst = redPickList.slice(0, 3);
  const blueBanSecond = blueBanList.slice(3, 5);
  const redBanSecond = redBanList.slice(3, 5);
  const bluePickSecond = bluePickList.slice(3, 5);
  const redPickSecond = redPickList.slice(3, 5);

  function render(list, containerId, type, team) {
    const container = document.getElementById(containerId);
    list.forEach(heroName => {
      const wrapper = document.createElement('div');
      wrapper.className = 'hero-pickban';

      const img = document.createElement('img');
      img.src = `images/${selectedGame}/${heroName.toLowerCase().replace(/ /g, '-')}.png`;
      img.alt = heroName;
      img.onerror = function() {
        this.src = 'images/default-hero.png'; // Fallback image jika gambar tidak ditemukan
      };

      if (type === 'pick') {
        const name = document.createElement('span');
        name.className = 'hero-name';
        name.textContent = heroName;

        if (team === 'blue') {
          wrapper.appendChild(img);
          wrapper.appendChild(name);
        } else {
          wrapper.appendChild(name);
          wrapper.appendChild(img);
        }
      } else {
        wrapper.appendChild(img); // Untuk ban, hanya gambar
      }

      container.appendChild(wrapper);
    });
  }

  render(blueBanFirst, 'blue-ban-first', 'ban', 'blue');
  render(redBanFirst, 'red-ban-first', 'ban', 'red');
  render(bluePickFirst, 'blue-pick-first', 'pick', 'blue');
  render(redPickFirst, 'red-pick-first', 'pick', 'red');
  render(blueBanSecond, 'blue-ban-second', 'ban', 'blue');
  render(redBanSecond, 'red-ban-second', 'ban', 'red');
  render(bluePickSecond, 'blue-pick-second', 'pick', 'blue');
  render(redPickSecond, 'red-pick-second', 'pick', 'red');
}


function showPhase() {
  if (currentStep < draftSequence.length) {
    const step = draftSequence[currentStep];
    document.getElementById('phase-text').innerText = `${step.action.toUpperCase()} - ${step.team.toUpperCase()} Team`;

    // Mulai timer baru
    startTimer();
  }
}

function resetDraft() {
  currentStep = 0;
  draftSequence = [];

  blueBanList.length = 0;
  redBanList.length = 0;
  bluePickList.length = 0;
  redPickList.length = 0;
  bannedHeroes.length = 0;
  pickedHeroes.length = 0;
  selectedGame = document.getElementById('gameSelector').value;
  heroes = selectedGame === 'mlbb' ? [...mlbbHeroes] : [...hokHeroes];  
  selectedRole = 'all';
  selectedLane = 'all';

  // Clear saved drafts from localStorage
  localStorage.removeItem('savedDrafts');
  
  // Always reset fearless bans when resetting in fearless mode
  bannedInFearlessMode = [];

  document.getElementById('draft-area').style.display = 'none';
  document.getElementById('phase-info').innerHTML = '<span id="phase-text"></span> - <span id="timer">45</span>s';

  document.getElementById('blue-ban-first').innerHTML = '';
  document.getElementById('red-ban-first').innerHTML = '';
  document.getElementById('blue-pick-first').innerHTML = '';
  document.getElementById('red-pick-first').innerHTML = '';
  document.getElementById('blue-ban-second').innerHTML = '';
  document.getElementById('red-ban-second').innerHTML = '';
  document.getElementById('blue-pick-second').innerHTML = '';
  document.getElementById('red-pick-second').innerHTML = '';
  document.getElementById('nextGame').style.display = 'none';
  document.getElementById('confirm-selection').style.display = 'none'; // ⬅️ Tambahkan ini
  renderHeroList();

  // Reset team picked history
  teamPickedHistory = {
    blue: [],
    red: []
  };

  // Tampilkan kembali semua hero
  renderHeroList();
}



function startNextGame() {
  currentStep = 0;
  draftSequence = [];

  blueBanList.length = 0;
  redBanList.length = 0;
  bluePickList.length = 0;
  redPickList.length = 0;
  bannedHeroes.length = 0;
  pickedHeroes.length = 0;

selectedGame = document.getElementById('gameSelector').value;
heroes = selectedGame === 'mlbb' ? [...mlbbHeroes] : [...hokHeroes];
  selectedRole = 'all';
  selectedLane = 'all';

  document.getElementById('phase-info').innerHTML = '<span id="phase-text"></span> - <span id="timer">45</span>s';
  document.getElementById('blue-ban-first').innerHTML = '';
  document.getElementById('red-ban-first').innerHTML = '';
  document.getElementById('blue-pick-first').innerHTML = '';
  document.getElementById('red-pick-first').innerHTML = '';
  document.getElementById('blue-ban-second').innerHTML = '';
  document.getElementById('red-ban-second').innerHTML = '';
  document.getElementById('blue-pick-second').innerHTML = '';
  document.getElementById('red-pick-second').innerHTML = '';
  document.getElementById('nextGame').style.display = 'none';
  document.getElementById('draft-area').style.display = 'none';
  document.getElementById('confirm-selection').style.display = 'none'; // ⬅️ Tambahkan ini
  renderHeroList();

  if (mode === 'normal') {
    teamPickedHistory = { blue: [], red: [] };
  }

  // Tambahkan ini supaya hero list muncul
  renderHeroList();
}




function toggleMusic() {
  const music = document.getElementById('backgroundMusic');
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

function saveDraft() {
  const draftResult = {
    blueBan: [...blueBanList],
    redBan: [...redBanList],
    bluePick: [...bluePickList],
    redPick: [...redPickList],
    timestamp: new Date().toISOString()
  };

  let savedDrafts = JSON.parse(localStorage.getItem('savedDrafts')) || [];
  savedDrafts.push(draftResult);
  localStorage.setItem('savedDrafts', JSON.stringify(savedDrafts));

  if (mode === 'fearless') {
    const allPicks = [...bluePickList, ...redPickList];
    allPicks.forEach(heroName => {
      if (!bannedInFearlessMode.includes(heroName)) {
        bannedInFearlessMode.push(heroName);
      }
    });
  }
}


function loadSavedDraft() {
  const savedDraftsDiv = document.getElementById('saved-drafts');

  if (savedDraftsDiv.innerHTML.trim() !== '') {
    savedDraftsDiv.innerHTML = '';
    return;
  }

  const saved = localStorage.getItem('savedDrafts');
  savedDraftsDiv.innerHTML = '';

  if (!saved) {
    savedDraftsDiv.innerHTML = '<p>Tidak ada draft yang tersimpan.</p>';
    return;
  }

  const drafts = JSON.parse(saved);
  savedDraftsDiv.innerHTML = `<h2>Draft Tersimpan (${drafts.length})</h2>`;

  drafts.forEach((draft, index) => {
    const draftDiv = document.createElement('div');
    draftDiv.className = 'draft-card';

    draftDiv.innerHTML = `
      <h3>Game #${index + 1}</h3>
      <div class="draft-teams-container">
        <div class="draft-team blue-team">
          <h4>Blue Team</h4>
          <div class="team-bans">
            <h5>Bans:</h5>
            <div class="hero-images"></div>
          </div>
          <div class="team-picks">
            <h5>Picks:</h5>
            <div class="hero-images"></div>
          </div>
        </div>
        <div class="draft-team red-team">
          <h4>Red Team</h4>
          <div class="team-bans">
            <h5>Bans:</h5>
            <div class="hero-images"></div>
          </div>
          <div class="team-picks">
            <h5>Picks:</h5>
            <div class="hero-images"></div>
          </div>
        </div>
      </div>
      <small><em>${new Date(draft.timestamp).toLocaleString()}</em></small>
    `;

    // Blue bans
    const blueBanImages = draftDiv.querySelector('.blue-team .team-bans .hero-images');
    draft.blueBan.forEach(heroName => {
      const img = document.createElement('img');
      img.src = `images/${selectedGame}/${heroName.toLowerCase().replace(/ /g, '-')}.png`;
      img.alt = heroName;
      img.title = heroName;
      img.onerror = function() {
        this.src = 'images/default-hero.png';
      };
      blueBanImages.appendChild(img);
    });

    // Blue picks
    const bluePickImages = draftDiv.querySelector('.blue-team .team-picks .hero-images');
    draft.bluePick.forEach(heroName => {
      const img = document.createElement('img');
      img.src = `images/${selectedGame}/${heroName.toLowerCase().replace(/ /g, '-')}.png`;
      img.alt = heroName;
      img.title = heroName;
      img.onerror = function() {
        this.src = 'images/default-hero.png';
      };
      bluePickImages.appendChild(img);
    });

    // Red bans
    const redBanImages = draftDiv.querySelector('.red-team .team-bans .hero-images');
    draft.redBan.forEach(heroName => {
      const img = document.createElement('img');
      img.src = `images/${selectedGame}/${heroName.toLowerCase().replace(/ /g, '-')}.png`;
      img.alt = heroName;
      img.title = heroName;
      img.onerror = function() {
        this.src = 'images/default-hero.png';
      };
      redBanImages.appendChild(img);
    });

    // Red picks
    const redPickImages = draftDiv.querySelector('.red-team .team-picks .hero-images');
    draft.redPick.forEach(heroName => {
      const img = document.createElement('img');
      img.src = `images/${selectedGame}/${heroName.toLowerCase().replace(/ /g, '-')}.png`;
      img.alt = heroName;
      img.title = heroName;
      img.onerror = function() {
        this.src = 'images/default-hero.png';
      };
      redPickImages.appendChild(img);
    });

    savedDraftsDiv.appendChild(draftDiv);
  });
}



function selectHero(hero) {
  const step = draftSequence[currentStep];
  if (!step) return;

  const heroName = hero.name;

  if (step.action === 'ban') {
    if (step.team === 'blue') blueBanList.push(heroName);
    else redBanList.push(heroName);
    bannedHeroes.push(heroName);
  } 
  else if (step.action === 'pick') {
    if (step.team === 'blue') bluePickList.push(heroName);
    else redPickList.push(heroName);

    pickedHeroes.push(heroName);

    if (mode === 'global') {
      teamPickedHistory[step.team].push(heroName);
    }
  }

  currentStep++;
  updateTeamDisplays();
  renderHeroList();
  showPhase();

  if (currentStep >= draftSequence.length) {
    document.getElementById('phase-info').innerText = '';
    saveDraft();
    document.getElementById('nextGame').style.display = 'inline-block';
  }
}

function startTimer() {
  clearInterval(timerInterval);
  timerSeconds = 45;
  document.getElementById('timer').innerText = timerSeconds;

  timerInterval = setInterval(() => {
    timerSeconds--;
    document.getElementById('timer').innerText = timerSeconds;

    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      autoAdvance();
    }
  }, 1000);
  if (timerSeconds <= 10) {
    document.getElementById('timer').style.color = '#ff4d4d';
  } else {
    document.getElementById('timer').style.color = '#4da6ff';
  }
  
}

function autoAdvance() {
  const step = draftSequence[currentStep];
  if (!step) return;

  if (step.action === 'ban') {
    // Ban kosong
    if (step.team === 'blue') blueBanList.push('(No Ban)');
    else redBanList.push('(No Ban)');
  } 
  else if (step.action === 'pick') {
    // Pick kosong
    if (step.team === 'blue') bluePickList.push('(No Pick)');
    else redPickList.push('(No Pick)');
  }

  currentStep++;
  updateTeamDisplays();
  renderHeroList();
  showPhase();

  if (currentStep >= draftSequence.length) {
    document.getElementById('phase-info').innerText = '';
    clearInterval(timerInterval);
    saveDraft();
    document.getElementById('nextGame').style.display = 'inline-block';
  }
}

function enableReorder() {
  const bluePicks = document.querySelectorAll('#blue-pick-first, #blue-pick-second');
  const redPicks = document.querySelectorAll('#red-pick-first, #red-pick-second');

  bluePicks.forEach(container => {
    new Sortable(container, {
      group: 'blue', // Biarkan pick-first dan pick-second biru bisa bebas drag
      animation: 150,
      ghostClass: 'dragging'
    });
  });

  redPicks.forEach(container => {
    new Sortable(container, {
      group: 'red', // Sama untuk merah
      animation: 150,
      ghostClass: 'dragging'
    });
  });

}


function updateBluePickList() {
  const bluePicks = [...document.querySelectorAll('#blue-pick-first .hero-name, #blue-pick-second .hero-name')];
  bluePickList.length = 0;
  bluePicks.forEach(pick => {
    bluePickList.push(pick.textContent);
  });
}

function updateRedPickList() {
  const redPicks = [...document.querySelectorAll('#red-pick-first .hero-name, #red-pick-second .hero-name')];
  redPickList.length = 0;
  redPicks.forEach(pick => {
    redPickList.push(pick.textContent);
  });
}

document.getElementById('saveOrderButton').addEventListener('click', saveNewOrder);

function saveNewOrder() {
  // Update blue team picks
  const bluePickElements = [...document.querySelectorAll('#blue-pick-first .hero-name, #blue-pick-second .hero-name')];
  bluePickList.length = 0;
  bluePickElements.forEach(el => {
    bluePickList.push(el.textContent);
  });

  // Update red team picks
  const redPickElements = [...document.querySelectorAll('#red-pick-first .hero-name, #red-pick-second .hero-name')];
  redPickList.length = 0;
  redPickElements.forEach(el => {
    redPickList.push(el.textContent);
  });

  // Setelah simpan, kita re-render tampilan
  updateTeamDisplays();
  alert('Urutan pick berhasil disimpan!');
}
