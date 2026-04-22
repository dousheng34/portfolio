import sys

html_file = 'c:/Users/SystemX/Documents/portfolio/index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Nav
nav_old = '''            <div class="nav-links hidden md:flex gap-8">
                <a href="#work" class="label-mono hover:text-blue-accent transition-colors">WORK</a>
                <a href="#about" class="label-mono hover:text-blue-accent transition-colors">ABOUT</a>
                <a href="#capabilities" class="label-mono hover:text-blue-accent transition-colors">CAPABILITIES</a>
                <a href="#process" class="label-mono hover:text-blue-accent transition-colors">PROCESS</a>
                <a href="#contact" class="label-mono hover:text-blue-accent transition-colors">CONTACT</a>
            </div>'''
            
nav_new = '''            <div class="nav-links hidden md:flex gap-8 items-center">
                <a href="#work" class="label-mono hover:text-blue-accent transition-colors" data-i18n="nav_work">WORK</a>
                <a href="#about" class="label-mono hover:text-blue-accent transition-colors" data-i18n="nav_about">ABOUT</a>
                <a href="#capabilities" class="label-mono hover:text-blue-accent transition-colors" data-i18n="nav_cap">CAPABILITIES</a>
                <a href="#process" class="label-mono hover:text-blue-accent transition-colors" data-i18n="nav_process">PROCESS</a>
                <a href="#contact" class="label-mono hover:text-blue-accent transition-colors" data-i18n="nav_contact">CONTACT</a>
                <div class="flex gap-2 ml-4 border-l border-white/10 pl-4 theme-border">
                    <button class="lang-btn text-xs font-mono opacity-50 hover:opacity-100 transition-opacity" data-lang="ru">RU</button>
                    <button class="lang-btn text-xs font-mono opacity-50 hover:opacity-100 transition-opacity" data-lang="en">EN</button>
                    <button class="lang-btn text-xs font-mono opacity-50 hover:opacity-100 transition-opacity" data-lang="kk">KK</button>
                </div>
                <button id="theme-toggle" class="ml-2 text-white/50 hover:text-white transition-colors theme-text" aria-label="Toggle theme">
                    <i data-lucide="moon" class="w-4 h-4 dark-icon hidden"></i>
                    <i data-lucide="sun" class="w-4 h-4 light-icon"></i>
                </button>
            </div>'''
content = content.replace(nav_old, nav_new)

# Add Video Section
hero_end = '''        </section>

        <!-- Work Section -->'''

video_section = '''        </section>

        <!-- Video Scroll Section -->
        <section id="video-sequence" style="height: 400vh; position: relative;">
            <div class="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
                <video class="seq-media absolute inset-0 w-full h-full object-cover transition-opacity duration-700" muted playsinline loop autoplay src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-connection-lines-20336-large.mp4"></video>
                <video class="seq-media absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700" muted playsinline loop autoplay src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-data-center-22441-large.mp4"></video>
                <video class="seq-media absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700" muted playsinline loop autoplay src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4"></video>
                <div class="absolute inset-0 bg-black/40 z-10 pointer-events-none seq-overlay"></div>
                <h2 class="seq-text absolute z-20 font-display text-5xl md:text-8xl text-white font-bold text-center uppercase tracking-widest transition-all duration-300 transform" data-i18n="seq_text_1">ИССЛЕДУЙ</h2>
            </div>
        </section>

        <!-- Work Section -->'''
content = content.replace(hero_end, video_section)

# i18n tags for Hero
content = content.replace('<span class="glitch-text" data-text="ПРЕВРАЩАЮ">ПРЕВРАЩАЮ</span>', '<span class="glitch-text" data-text="ПРЕВРАЩАЮ" data-i18n="hero_title_1">ПРЕВРАЩАЮ</span>')
content = content.replace('<span class="text-blue-accent">ШУМ В</span>', '<span class="text-blue-accent" data-i18n="hero_title_2">ШУМ В</span>')
content = content.replace('СМЫСЛ', '<span data-i18n="hero_title_3">СМЫСЛ</span>', 1)
content = content.replace('AI-креатор с 3-летним опытом. Экспертиза на стыке кода и визуального искусства. Создаю реальность, в которой ошибки ИИ становятся артефактами стиля.', '<span data-i18n="hero_desc">AI-креатор с 3-летним опытом. Экспертиза на стыке кода и визуального искусства. Создаю реальность, в которой ошибки ИИ становятся артефактами стиля.</span>')
content = content.replace('СМОТРЕТЬ РАБОТЫ', '<span data-i18n="hero_btn">СМОТРЕТЬ РАБОТЫ</span>')

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)
print('HTML updated successfully.')
