/**
 * SOMA Notifications System
 * File: notifications.js
 * 
 * Sistem notifikasi reminder aktif untuk SOMA.
 * - Browser Notification API (push ke desktop/HP)
 * - In-page Toast (popup di layar)
 * - Reminder: tidur, fokus, memory, belajar, breathing
 * - Pengingat hal yang sering dilupa (dari memory.html)
 * - Pengaturan on/off per kategori
 */

const SomaNotify = {
    config: {
        enabled: true,
        soundEnabled: true,
        reminders: {
            sleep:    { enabled: true, time: '21:30', label: 'Persiapan Tidur', icon: '😴' },
            focus:    { enabled: true, time: '08:00', label: 'Sesi Fokus Pagi', icon: '🎯' },
            memory:   { enabled: true, time: '15:00', label: 'Latihan Memory', icon: '🧩' },
            learn:    { enabled: true, time: '20:00', label: 'Waktu Belajar', icon: '📖' },
            breathing:{ enabled: true, time: '06:00', label: 'Breathing Exercise', icon: '🌬️' },
            forgetful:{ enabled: true, time: '07:00', label: 'Pengingat Hal yang Sering Lupa', icon: '💡' }
        }
    },

    toastContainer: null,
    audioCtx: null,
    intervals: [],

    init: function() {
        this.loadConfig();
        this.createToastContainer();
        this.requestPermission();
        this.startAllReminders();
    },

    loadConfig: function() {
        try {
            const saved = localStorage.getItem('soma_notify_config');
            if (saved) {
                const parsed = JSON.parse(saved);
                Object.assign(this.config, parsed);
                if (parsed.reminders) Object.assign(this.config.reminders, parsed.reminders);
            }
        } catch(e) {}
    },

    saveConfig: function() {
        localStorage.setItem('soma_notify_config', JSON.stringify(this.config));
    },

    requestPermission: function() {
        if (!('Notification' in window)) return;
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    },

    sendBrowserNotif: function(title, body, icon) {
        if (!this.config.enabled) return;
        if (!('Notification' in window) || Notification.permission !== 'granted') return;
        try {
            const notif = new Notification(title, {
                body: body, icon: icon || '🧠',
                tag: 'soma-' + Date.now(), requireInteraction: false
            });
            notif.onclick = function() { window.focus(); this.close(); };
            setTimeout(() => notif.close(), 8000);
        } catch(e) {}
    },

    createToastContainer: function() {
        if (this.toastContainer) return;
        this.toastContainer = document.createElement('div');
        this.toastContainer.id = 'somaToastContainer';
        this.toastContainer.style.cssText = `
            position:fixed;top:20px;right:20px;z-index:99999;
            display:flex;flex-direction:column;gap:10px;
            max-width:380px;pointer-events:none;
        `;
        document.body.appendChild(this.toastContainer);
        if (!document.getElementById('somaToastAnim')) {
            const style = document.createElement('style');
            style.id = 'somaToastAnim';
            style.textContent = `
                @keyframes somaSlideIn{from{opacity:0;transform:translateX(100%)}to{opacity:1;transform:translateX(0)}}
                @keyframes somaSlideOut{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(100%)}}
            `;
            document.head.appendChild(style);
        }
    },

    showToast: function(title, body, type, duration) {
        if (!this.config.enabled) return;
        if (!this.toastContainer) this.createToastContainer();
        const colors = {
            sleep:   {bg:'#1e293b',border:'#0d9488',text:'#2dd4bf',icon:'😴'},
            focus:   {bg:'#1e293b',border:'#0d9488',text:'#2dd4bf',icon:'🎯'},
            memory:  {bg:'#1e293b',border:'#a5b4fc',text:'#c7d2fe',icon:'🧩'},
            learn:   {bg:'#1e293b',border:'#8b5cf6',text:'#a78bfa',icon:'📖'},
            breathing:{bg:'#1e293b',border:'#06b6d4',text:'#67e8f9',icon:'🌬️'},
            forgetful:{bg:'#1e293b',border:'#f59e0b',text:'#fbbf24',icon:'💡'},
            success: {bg:'#1e293b',border:'#10b981',text:'#34d399',icon:'✅'},
            info:    {bg:'#1e293b',border:'#38bdf8',text:'#7dd3fc',icon:'🧠'}
        };
        const c = colors[type] || colors.info;
        const toast = document.createElement('div');
        toast.style.cssText = `
            background:${c.bg};border:2px solid ${c.border};border-radius:14px;
            padding:14px 18px;box-shadow:0 0 20px ${c.border}40,0 8px 30px rgba(0,0,0,0.3);
            display:flex;align-items:flex-start;gap:12px;animation:somaSlideIn 0.3s ease;
            pointer-events:auto;cursor:pointer;
        `;
        toast.innerHTML = `
            <div style="font-size:1.5rem;flex-shrink:0;">${c.icon}</div>
            <div style="flex:1;">
                <div style="font-weight:700;font-size:0.9rem;color:${c.text};margin-bottom:4px;">${title}</div>
                <div style="font-size:0.82rem;color:#94a3b8;">${body}</div>
            </div>
            <button style="background:none;border:none;color:#64748b;cursor:pointer;font-size:1.1rem;padding:0;">×</button>
        `;
        toast.querySelector('button').onclick = () => toast.remove();
        toast.onclick = () => toast.remove();
        this.toastContainer.appendChild(toast);
        const dur = duration || 6000;
        setTimeout(() => { toast.style.animation='somaSlideOut 0.3s ease forwards'; setTimeout(()=>toast.remove(),300); }, dur);
        if (this.config.soundEnabled) this.playBeep();
    },

    playBeep: function() {
        try {
            if (!this.audioCtx) this.audioCtx = new (window.AudioContext||window.webkitAudioContext)();
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.connect(gain); gain.connect(this.audioCtx.destination);
            osc.frequency.value = 660; osc.type = 'sine';
            gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.4);
            osc.start(this.audioCtx.currentTime);
            osc.stop(this.audioCtx.currentTime + 0.4);
        } catch(e) {}
    },

    startAllReminders: function() {
        this.stopAllReminders();
        if (!this.config.enabled) return;
        Object.keys(this.config.reminders).forEach(key => {
            if (this.config.reminders[key].enabled) this.startTimeReminder(key);
        });
    },

    stopAllReminders: function() {
        this.intervals.forEach(id => clearInterval(id));
        this.intervals = [];
    },

    startTimeReminder: function(key) {
        const r = this.config.reminders[key];
        if (!r || !r.time) return;
        const checkKey = 'soma_notified_' + key + '_' + new Date().toDateString();
        const check = () => {
            if (sessionStorage.getItem(checkKey)) return;
            const now = new Date();
            const [h, m] = r.time.split(':').map(Number);
            if (now.getHours() === h && now.getMinutes() === m) {
                sessionStorage.setItem(checkKey, '1');
                this.fireReminder(key);
            }
        };
        check();
        const id = setInterval(check, 30000);
        this.intervals.push(id);
    },

    fireReminder: function(key) {
        const r = this.config.reminders[key];
        const messages = {
            sleep: { title: '😴 Saatnya Persiapan Tidur', body: 'Matikan gadget, lakukan breathing exercise, baca doa tidur. Target tidur 22:00.' },
            focus: { title: '🎯 Waktunya Sesi Fokus', body: 'Mulai Pomodoro 25 menit. Aktifkan brown noise untuk deep focus.' },
            memory: { title: '🧩 Latihan Memory', body: 'Main memory game 10 menit untuk latih hippocampus. Word recall atau sequence memory.' },
            learn: { title: '📖 Waktu Belajar', body: 'Buka Learning Assistant, pelajari materi baru 25 menit. Belajar sebelum tidur = memory permanen.' },
            breathing: { title: '🌬️ Breathing Exercise Pagi', body: 'Mulai hari dengan 4-7-8 breathing. 4 siklus untuk tenangkan pikiran.' },
            forgetful: { title: '💡 Pengingat Hal yang Sering Lupa', body: this.getForgetfulReminder() }
        };
        const msg = messages[key] || { title: r.label, body: 'Saatnya aktivitas SOMA.' };
        this.showToast(msg.title, msg.body, key, 8000);
        this.sendBrowserNotif(msg.title, msg.body, r.icon);
    },

    getForgetfulReminder: function() {
        try {
            const items = JSON.parse(localStorage.getItem('soma_forgetful_items') || '[]');
            if (items.length === 0) return 'Belum ada catatan hal yang sering dilupa. Tambahkan di halaman Memory.';
            const today = new Date().toDateString();
            const todayItems = items.filter(item => new Date(item.date).toDateString() === today);
            if (todayItems.length > 0) {
                return 'Hari ini ingat: ' + todayItems.map(i => '• ' + i.text).join(' ');
            }
            const random = items[Math.floor(Math.random() * items.length)];
            return 'Jangan lupa: ' + random.text;
        } catch(e) { return 'Cek catatan hal yang sering dilupa di halaman Memory.'; }
    },

    toggle: function(on) { this.config.enabled = on; this.saveConfig(); if(on) this.startAllReminders(); else this.stopAllReminders(); },
    toggleReminder: function(name, on) { if(this.config.reminders[name]){this.config.reminders[name].enabled=on;this.saveConfig();this.startAllReminders();} },
    setReminderTime: function(name, time) { if(this.config.reminders[name]){this.config.reminders[name].time=time;this.saveConfig();this.startAllReminders();} },
    test: function() { this.showToast('🧪 Test Notifikasi SOMA', 'Notifikasi berfungsi! 🧠', 'success', 4000); this.sendBrowserNotif('🧪 Test SOMA', 'Notifikasi berfungsi! 🧠', '🧠'); },
    getConfig: function() { return JSON.parse(JSON.stringify(this.config)); }
};