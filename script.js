
<script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "آموزشگاه فامو",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "بابل",
            "streetAddress": "میدان باغ فردوس، جنب بیمارستان بابل کلینیک، مدرسه بهارستان"
        },
        "telephone": "+981132221234",
        "url": "https://famoacademy.ir",
        "founder": {
            "@type": "Person",
            "name": "دکتر محمد موسی زاده موسوی"
        },
        "priceRange": "3,000,000 تومان"
    }
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <!-- Tailwind Configuration -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'light-bg': '#FDFCF6',
                        'dark-text': '#3D3D3D',
                        'light-text': '#FDFCF6',
                        'accent-lemon': '#2d3748',
                        'accent-lemon-dark': '#4a5568',
                        'card-bg': '#FFFFFF',
                        'border-light': 'rgba(0, 0, 0, 0.08)',
                        'navy-blue': '#2d3748',
                        'navy-light': '#4a5568',
                        'navy-dark': '#1a202c'
                    },
                    fontFamily: {
                        'vazir': ['Vazirmatn', 'sans-serif'],
                    },
                    animation: {
                        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                        'subtle-float': 'subtleFloat 6s ease-in-out infinite',
                    },
                    keyframes: {
                        fadeInUp: {
                            '0%': { opacity: '0', transform: 'translateY(20px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' },
                        },
                        subtleFloat: {
                            '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
                            '50%': { transform: 'translateY(-12px) rotate(2deg)' },
                        },
                    },
                }
            }
        }
    </script>
        // User management
        let currentUser = null;
        let userCourses = [];
        
        function handleSignup(event) {
            event.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const mobile = document.getElementById('mobile').value;
            const grade = document.getElementById('grade').value;
            const field = document.getElementById('field').value;
            
            currentUser = {
                name: fullName,
                phone: mobile,
                grade: grade,
                field: field,
            };
            
            // Save user to localStorage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Close modal
            closeModal(document.getElementById('auth-modal'));
            
            // Show profile page
            showProfilePage();
            // Update profile info
            updateProfileInfo();
        }
        function showProfilePage() {
            document.querySelectorAll('main > section').forEach(section => {
                section.classList.add('hidden');
            });
            document.getElementById('profile').classList.remove('hidden');
        }
        
        function updateProfileInfo() {
            if (currentUser) {
                document.getElementById('user-name').textContent = currentUser.name;
                document.getElementById('user-phone').textContent = currentUser.phone;
                document.getElementById('user-email').textContent = currentUser.email;
            }
        }
        
        function selectCourse(courseName) {
            if (!currentUser) {
                openModal(document.getElementById('auth-modal'));
                return;
            }
            
            document.getElementById('payment-course').textContent = courseName;
            document.querySelectorAll('main > section').forEach(section => {
                section.classList.add('hidden');
            });
            document.getElementById('payment').classList.remove('hidden');
        }
        
        function addCourse(courseName) {
            const courseElement = document.createElement('div');
            courseElement.className = 'bg-light-bg rounded-lg p-4 flex items-center justify-between';
            courseElement.innerHTML = `
                <div>
                    <h4 class="font-bold">${courseName}</h4>
                    <p class="text-sm text-dark-text/70">ترم پاییز ۱۴۰۳</p>
                </div>
                <div>
                    <span class="text-sm font-semibold bg-green-100 text-green-800 py-1 px-3 rounded-full">فعال</span>
                    <button class="ml-2 text-red-500 hover:text-red-700" onclick="removeCourse(this)">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            document.getElementById('user-courses').appendChild(courseElement);
            // Show success message
            alert(`دوره ${courseName} با موفقیت به پروفایل شما اضافه شد!`);
        }
        
        function removeCourse(button) {
            const courseElement = button.closest('.bg-light-bg');
            courseElement.remove();
        }
        
        document.addEventListener('DOMContentLoaded', function () {
            // --- General UI ---
            document.getElementById('year').textContent = new Date().toLocaleDateString('fa-IR', { year: 'numeric' }).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
            const menuBtn = document.getElementById('menuBtn');
            const mobileMenu = document.getElementById('mobileMenu');
            menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
            document.querySelectorAll('#mobileMenu a, #mobileMenu button').forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));
            
            // Load user if exists
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
                updateProfileInfo();
            }

            // --- Intersection Observer ---
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show-anim');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.hidden-anim').forEach((el) => observer.observe(el));

            // --- Swiper.js for Team Slider ---
            const swiper = new Swiper('.team-slider', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }
            });

            // --- Services Card Cycler ---
            const servicesContainer = document.getElementById('services-container');
            if(servicesContainer) {
                const serviceCards = servicesContainer.querySelectorAll('.service-card');
                let currentServiceIndex = 0;
                setInterval(() => {
                    serviceCards[currentServiceIndex].classList.remove('active');
                    currentServiceIndex = (currentServiceIndex + 1) % serviceCards.length;
                    serviceCards[currentServiceIndex].classList.add('active');
                }, 5000); // Change card every 5 seconds
            }

            // --- Modal Logic ---
            function openModal(modal) {
                if (!modal) return;
                const content = modal.querySelector('.modal-content');
                modal.classList.remove('invisible', 'opacity-0');
                if(content) content.classList.remove('scale-95');
            }

            function closeModal(modal) {
                if (!modal) return;
                const content = modal.querySelector('.modal-content');
                if(content) content.classList.add('scale-95');
                modal.classList.add('opacity-0');
                setTimeout(() => modal.classList.add('invisible'), 300);
            }

            // --- Auth Modal ---
            const authModal = document.getElementById('auth-modal');
            const openAuthBtn = document.getElementById('open-auth-modal-btn');
            const openAuthBtnMobile = document.getElementById('open-auth-modal-btn-mobile');
            const closeAuthBtn = document.getElementById('close-auth-modal-btn');

            openAuthBtn?.addEventListener('click', () => openModal(authModal));
            openAuthBtnMobile?.addEventListener('click', () => openModal(authModal));
            closeAuthBtn?.addEventListener('click', () => closeModal(authModal));
            authModal?.addEventListener('click', (e) => {
                if (e.target === authModal) closeModal(authModal);
            });
            
            // --- Team Modal ---
            const teamModal = document.getElementById('team-modal');
            const teamMembers = {
                1: {
                    name: "دکتر محمد موسوی",
                    role: "مشاور ارشد و بنیان‌گذار",
                    bio: "بنیان‌گذار و مدیر آموزشگاه فامو با سال‌ها تجربه درخشان در زمینه مشاوره تحصیلی و برنامه‌ریزی درسی برای رتبه‌های برتر کنکور.",
                    skills: ["مشاوره تحصیلی", "برنامه‌ریزی استراتژیک", "روانشناسی نوجوان", "مدیریت آموزشی"],
                    image: "https://placehold.co/400x400/F9E8A8/3D3D3D?text=M.M"
                },
                2: {
                    name: "مهندس علی موسوی",
                    role: "مدرس ریاضی",
                    bio: "مدرس تخصصی ریاضیات کنکور با سابقه درخشان در تدریس مفهومی و پایه‌ای. تمرکز بر روی حل تست‌های چالشی و افزایش سرعت عمل دانش‌آموزان.",
                    skills: ["ریاضیات تجربی", "حسابان", "هندسه", "ریاضیات گسسته"],
                    image: "https://placehold.co/400x400/F9E8A8/3D3D3D?text=A.M"
                },
                3: {
                    name: "دکتر اسماعیل حاجیان",
                    role: "مدرس فیزیک",
                    bio: "دکترای فیزیک و مدرس با تجربه کنکور با تمرکز بر حل مسائل پیچیده و آموزش تکنیک‌های تست‌زنی در کوتاه‌ترین زمان ممکن.",
                    skills: ["فیزیک کنکور", "مکانیک", "الکتریسیته و مغناطیس", "فیزیک نوین"],
                    image: "https://placehold.co/400x400/F9E8A8/3D3D3D?text=E.H"
                },
                4: {
                    name: "استاد رضا نصرالله زاده",
                    role: "مدرس شیمی",
                    bio: "مدرس تخصصی و محبوب شیمی کنکور با روش‌های نوین آموزشی و جزوات انحصاری برای تسلط کامل بر مفاهیم و مسائل شیمی.",
                    skills: ["شیمی آلی", "شیمی معدنی", "مسائل استوکیومتری", "شیمی کنکور"],
                    image: "https://placehold.co/400x400/F9E8A8/3D3D3D?text=R.N"
                },
                5: {
                    name: "دکتر مانی محسنی",
                    role: "مدرس زیست",
                    bio: "پزشک و مدرس زیست‌شناسی کنکور با تسلط کامل بر مفاهیم ترکیبی و نکات پنهان کتاب درسی. متخصص در تحلیل آزمون‌های آزمایشی.",
                    skills: ["زیست شناسی سلولی", "ژنتیک", "زیست گیاهی", "فیزیولوژی جانوری"],
                    image: "https://placehold.co/400x400/F9E8A8/3D3D3D?text=M.M"
                },
                6: {
                    name: "استاد رضا رحمان زاده",
                    role: "مدرس ادبیات",
                    bio: "کارشناس ارشد ادبیات و مدرس تخصصی کنکور با فن بیان عالی و تمرکز بر روی آرایه‌های ادبی، قرابت معنایی و دستور زبان فارسی.",
                    skills: ["ادبیات فارسی", "آرایه‌های ادبی", "قرابت معنایی", "زبان فارسی"],
                    image: "https://placehold.co/400x400/F9E8A8/3D3D3D?text=R.R"
                },
                7: {
                    name: "دکتر فاطمه میریان",
                    role: "مدرس زبان",
                    bio: "دکترای آموزش زبان انگلیسی و متخصص آزمون‌های زبان کنکور. ارائه‌دهنده تکنیک‌های مدیریت زمان و پاسخ به سوالات درک مطلب و واژگان.",
                    skills: ["گرامر", "درک مطلب", "واژگان کنکور", "آزمون‌های زبان"],
                    image: "https://placehold.co/400x400/F9E8A8/3D3D3D?text=F.M"
                },
                8: {
                    name: "استاد محمد میر حسینی",
                    role: "مدرس هوش و استعداد",
                    bio: "مدرس تخصصی هوش و استعداد تحصیلی برای آزمون‌های ورودی مدارس برتر (سمپاد). متخصص در تقویت هوش کلامی و غیرکلامی دانش‌آموزان.",
                    skills: ["هوش کلامی", "هوش تصویری", "استعداد تحلیلی", "آزمون‌های سمپاد"],
                    image: "https://placehold.co/400x400/F9E8A8/3D3D3D?text=M.MH"
                },
                9: {
                    name: "دکتر محمد باخوش",
                    role: "پشتیبان تجربی",
                    bio: "دانشجوی پزشکی و رتبه برتر کنکور، همراه شما در مسیر موفقیت. ارائه‌دهنده برنامه‌های درسی دقیق و پیگیری مستمر.",
                    skills: ["برنامه‌ریزی درسی", "تحلیل آزمون", "مشاوره انگیزشی", "رفع اشکال زیست"],
                    image: "https://placehold.co/400x400/F9E8A8/3D3D3D?text=M.B"
                },
                10: {
                    name: "مهندس محمدحسین داودی",
                    role: "پشتیبان ریاضی",
                    bio: "دانشجوی مهندسی عمران و مشاور تخصصی دانش‌آموزان رشته ریاضی. متخصص در تحلیل آزمون و رفع اشکال دروس تخصصی.",
                    skills: ["برنامه‌ریزی درسی", "تحلیل آزمون", "مشاوره انگیزشی", "رفع اشکال حسابان"],
                    image: "https://placehold.co/400x400/F9E8A8/3D3D3D?text=M.D"
                },
                11: {
                    name: "استاد سایدا بناری",
                    role: "پشتیبان انسانی",
                    bio: "دانشجوی دانشگاه فرهنگیان و مشاور باانگیزه رشته انسانی. متخصص در روش‌های مطالعه دروس حفظی و مفهومی.",
                    skills: ["برنامه‌ریزی درسی", "تحلیل آزمون", "مشاوره انگیزشی", "روش مطالعه"],
                    image: "https://placehold.co/400x400/F9E8A8/3D3D3D?text=S.B"
                },
                12: {
                    name: "استاد حیدرعلی محمدی",
                    role: "پشتیبان تیزهوشان",
                    bio: "دانشجوی دانشگاه فرهنگیان و متخصص کار با دانش‌آموزان دوره متوسطه اول برای آمادگی آزمون‌های ورودی مدارس برتر.",
                    skills: ["برنامه‌ریزی درسی", "تحلیل آزمون", "مشاوره انگیزشی", "استعداد تحصیلی"],
                    image: "https://placehold.co/400x400/F9E8A8/3D3D3D?text=H.M"
                }
            };

            document.querySelectorAll('.team-member').forEach(member => {
                member.addEventListener('click', function() {
                    const memberId = this.getAttribute('data-member-id');
                    const memberData = teamMembers[memberId];
                    
                    if (memberData) {
                        const skillsHTML = memberData.skills.map(skill => 
                            `<li class="bg-accent-lemon/30 text-accent-lemon-dark px-3 py-1 rounded-full text-sm">${skill}</li>`
                        ).join('');
                        
                        const modalContentHTML = `
                            <div class="p-8 relative">
                                <button id="close-team-modal-btn" class="absolute top-4 left-4 text-dark-text/50 hover:text-dark-text transition">
                                    <i class="fas fa-times text-2xl"></i>
                                </button>
                                <div class="flex flex-col md:flex-row items-center gap-6">
                                    <div class="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-accent-lemon/50">
                                        <img src="${memberData.image}" alt="${memberData.name}" class="w-full h-full object-cover">
                                    </div>
                                    <div class="text-center md:text-right">
                                        <h3 class="text-2xl font-bold">${memberData.name}</h3>
                                        <p class="text-accent-lemon-dark font-medium">${memberData.role}</p>
                                        <p class="mt-4 text-dark-text/70">${memberData.bio}</p>
                                    </div>
                                </div>
                                <div class="mt-8">
                                    <h4 class="font-bold text-lg">مهارت‌ها</h4>
                                    <ul class="mt-2 flex flex-wrap gap-2">
                                        ${skillsHTML}
                                    </ul>
                                </div>
                            </div>
                        `;
                        
                        document.getElementById('modal-content').innerHTML = modalContentHTML;
                        openModal(teamModal);
                        
                        document.getElementById('close-team-modal-btn')?.addEventListener('click', () => closeModal(teamModal));
                    }
                });
            });
            
            teamModal?.addEventListener('click', (e) => {
                if (e.target === teamModal) closeModal(teamModal);
            });

        });
    </script>