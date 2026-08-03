
// Vanilla JS SPA Router (Local-first)

document.addEventListener('DOMContentLoaded', () => {
    const mainContentContainer = document.querySelector('.main-content');
    if (!mainContentContainer) return;

    // Cache with preloaded HTML to bypass local file CORS restrictions
    const pageCache = {
        'dashboard.html': mainContentContainer.innerHTML,
        'calendar.html': `<div class="page-container">
        
        <!-- Header -->
        <header class="top-nav">
            <div class="page-title-area">
                <h1>Calendar</h1>
                <p>Plan your schedule and never miss a deadline.</p>
            </div>
            
            <div class="nav-actions">
                <div class="search-bar">
                    <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" placeholder="Search events...">
                </div>
                <button class="icon-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <span class="badge">3</span>
                </button>
                <button class="icon-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </button>
                <div class="avatar-container">
                    <img src="ui/desh_bord.png" alt="User Avatar" onerror="this.style.display='none'">
                </div>
            </div>
        </header>

        <!-- Main Layout -->
        <div class="calendar-layout">
            
            <!-- Center Column: Calendar Grid & Bottom Panels -->
            <div class="calendar-main">
                
                <!-- Controls -->
                <div class="calendar-controls">
                    <div class="view-toggles">
                        <button class="toggle-btn active">Month</button>
                        <button class="toggle-btn">Week</button>
                        <button class="toggle-btn">Day</button>
                        <button class="toggle-btn">Agenda</button>
                    </div>
                    
                    <div class="date-nav">
                        <button class="nav-btn today-btn">Today</button>
                        <button class="nav-btn icon-only">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                        <button class="nav-btn icon-only">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                        <button class="btn-primary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            Add Event
                        </button>
                    </div>
                </div>

                <!-- Calendar Card -->
                <div class="calendar-card">
                    <h2 class="month-title">July 2026</h2>
                    
                    <div class="calendar-grid">
                        <!-- Days Header -->
                        <div class="day-header">Mon</div>
                        <div class="day-header">Tue</div>
                        <div class="day-header">Wed</div>
                        <div class="day-header">Thu</div>
                        <div class="day-header">Fri</div>
                        <div class="day-header">Sat</div>
                        <div class="day-header">Sun</div>

                        <!-- Row 1 -->
                        <div class="cal-cell outside">29</div>
                        <div class="cal-cell outside">30</div>
                        <div class="cal-cell">
                            <span class="date">1</span>
                            <div class="event e-purple"><span class="dot"></span>Read 20 pages</div>
                            <div class="more-events">+2 more</div>
                        </div>
                        <div class="cal-cell"><span class="date">2</span></div>
                        <div class="cal-cell">
                            <span class="date">3</span>
                            <div class="event e-green"><span class="dot"></span>Exercise 30 min</div>
                        </div>
                        <div class="cal-cell">
                            <span class="date">4</span>
                            <div class="event e-orange"><span class="dot"></span>DBMS Assignment</div>
                            <div class="more-events">+1 more</div>
                        </div>
                        <div class="cal-cell"><span class="date">5</span></div>

                        <!-- Row 2 -->
                        <div class="cal-cell"><span class="date">6</span></div>
                        <div class="cal-cell">
                            <span class="date">7</span>
                            <div class="event e-blue"><span class="dot"></span>JavaScript DOM</div>
                            <div class="more-events">+1 more</div>
                        </div>
                        <div class="cal-cell"><span class="date">8</span></div>
                        <div class="cal-cell">
                            <span class="date">9</span>
                            <div class="event e-purple"><span class="dot"></span>Library Visit</div>
                        </div>
                        <div class="cal-cell"><span class="date">10</span></div>
                        <div class="cal-cell">
                            <span class="date">11</span>
                            <div class="event e-red"><span class="dot"></span>Build Mini Project</div>
                            <div class="more-events">+2 more</div>
                        </div>
                        <div class="cal-cell"><span class="date">12</span></div>

                        <!-- Row 3 -->
                        <div class="cal-cell">
                            <span class="date">13</span>
                            <div class="event e-orange"><span class="dot"></span>Math Practice</div>
                        </div>
                        <div class="cal-cell"><span class="date">14</span></div>
                        <div class="cal-cell active-today">
                            <span class="date highlight">15</span>

                        </div>
                        <div class="cal-cell"><span class="date">16</span></div>
                        <div class="cal-cell">
                            <span class="date">17</span>
                            <div class="event e-blue"><span class="dot"></span>System Design</div>
                            <div class="more-events">+1 more</div>
                        </div>
                        <div class="cal-cell"><span class="date">18</span></div>
                        <div class="cal-cell">
                            <span class="date">19</span>
                            <div class="event e-purple"><span class="dot"></span>Note Revision</div>
                        </div>

                        <!-- Row 4 -->
                        <div class="cal-cell"><span class="date">20</span></div>
                        <div class="cal-cell">
                            <span class="date">21</span>
                            <div class="event e-red"><span class="dot"></span>Mock Test</div>
                            <div class="more-events">+1 more</div>
                        </div>
                        <div class="cal-cell"><span class="date">22</span></div>
                        <div class="cal-cell">
                            <span class="date">23</span>
                            <div class="event e-orange"><span class="dot"></span>Read Book</div>
                            <div class="more-events">+1 more</div>
                        </div>
                        <div class="cal-cell"><span class="date">24</span></div>
                        <div class="cal-cell">
                            <span class="date">25</span>
                            <div class="event e-green"><span class="dot"></span>Workout</div>
                        </div>
                        <div class="cal-cell"><span class="date">26</span></div>

                        <!-- Row 5 -->
                        <div class="cal-cell">
                            <span class="date">27</span>
                            <div class="event e-blue"><span class="dot"></span>Plan Next Week</div>
                        </div>
                        <div class="cal-cell"><span class="date">28</span></div>
                        <div class="cal-cell">
                            <span class="date">29</span>
                            <div class="event e-purple"><span class="dot"></span>Mind Map Topics</div>
                        </div>
                        <div class="cal-cell"><span class="date">30</span></div>
                        <div class="cal-cell">
                            <span class="date">31</span>
                            <div class="event e-red"><span class="dot"></span>Weekly Review</div>
                        </div>
                        <div class="cal-cell outside">1</div>
                        <div class="cal-cell outside">2</div>
                    </div>
                </div>

            </div>

            <!-- Right Sidebar -->
            <aside class="calendar-sidebar">
                
                <!-- Mini Calendar -->
                <div class="side-card mini-cal">
                    <div class="mini-header">
                        <h4>Mini Calendar</h4>
                        <div class="mini-nav">
                            <span>July 2026</span>
                            <div class="arrows">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </div>
                    <div class="mini-grid">
                        <div class="m-head">Mo</div><div class="m-head">Tu</div><div class="m-head">We</div><div class="m-head">Th</div><div class="m-head">Fr</div><div class="m-head">Sa</div><div class="m-head">Su</div>
                        <div class="m-day out">29</div><div class="m-day out">30</div><div class="m-day">1</div><div class="m-day">2</div><div class="m-day">3</div><div class="m-day">4</div><div class="m-day">5</div>
                        <div class="m-day">6</div><div class="m-day">7</div><div class="m-day">8</div><div class="m-day">9</div><div class="m-day">10</div><div class="m-day">11</div><div class="m-day">12</div>
                        <div class="m-day">13</div><div class="m-day">14</div><div class="m-day active">15</div><div class="m-day">16</div><div class="m-day">17</div><div class="m-day">18</div><div class="m-day">19</div>
                        <div class="m-day">20</div><div class="m-day">21</div><div class="m-day">22</div><div class="m-day">23</div><div class="m-day">24</div><div class="m-day">25</div><div class="m-day">26</div>
                        <div class="m-day">27</div><div class="m-day">28</div><div class="m-day">29</div><div class="m-day">30</div><div class="m-day">31</div><div class="m-day out">1</div><div class="m-day out">2</div>
                    </div>
                </div>

                <!-- Calendars Checkboxes -->
                <div class="side-card calendars-list">
                    <h4>Calendars</h4>
                    <p class="sub-text">Manage your calendars</p>
                    <ul class="c-list">
                        <li><label><input type="checkbox" checked><span class="c-box bg-purple"></span> Tasks</label><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></li>
                        <li><label><input type="checkbox" checked><span class="c-box bg-blue"></span> Study</label><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></li>
                        <li><label><input type="checkbox" checked><span class="c-box bg-green"></span> Personal</label><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></li>
                        <li><label><input type="checkbox" checked><span class="c-box bg-orange"></span> Work</label><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></li>
                        <li><label><input type="checkbox" checked><span class="c-box bg-red"></span> Exams</label><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></li>
                    </ul>
                    <button class="add-cal-btn">+ Add Calendar</button>
                </div>

                <!-- Upcoming Events -->
                <div class="side-card upcoming">
                    <h4>Upcoming Events</h4>
                    <p class="sub-text">Next 7 days</p>
                    <ul class="u-list">
                        <li><span class="dot c-purple"></span><div class="u-info"><h5>Read 20 pages</h5><span>Tomorrow, 08:00 AM</span></div></li>
                        <li><span class="dot c-blue"></span><div class="u-info"><h5>JavaScript DOM</h5><span>Tue, 7 Jul, 10:00 AM</span></div></li>
                        <li><span class="dot c-purple"></span><div class="u-info"><h5>Library Visit</h5><span>Thu, 9 Jul, 02:00 PM</span></div></li>
                        <li><span class="dot c-red"></span><div class="u-info"><h5>Build Mini Project</h5><span>Sat, 11 Jul, 03:00 PM</span></div></li>
                    </ul>
                    <button class="view-all-btn">View All Events</button>
                </div>

            </aside>

        </div>
    `,
        'tasks.html': `<div class="page-container">
        <!-- Top Navigation Area -->
        <header class="top-nav">
            <div class="page-title-area">
                <h1>Tasks</h1>
                <p>Manage all your tasks in one place.</p>
            </div>
            
            <div class="nav-actions">
                <div class="search-bar">
                    <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" placeholder="Search tasks...">
                </div>
                <button class="icon-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <span class="badge">1</span>
                </button>
                <button class="icon-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </button>
                <div class="avatar-container">
                    <img src="ui/desh_bord.png" alt="User Avatar" onerror="this.style.display='none'">
                </div>
            </div>
        </header>

        <!-- Actions Row -->
        <div class="action-row right-align">
            <button class="btn-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Task
            </button>
        </div>

        <!-- Filters Row -->
        <div class="filters-row">
            <div class="filter-tabs">
                <button class="tab-btn active">All</button>
                <button class="tab-btn">Daily</button>
                <button class="tab-btn">Weekly</button>
                <button class="tab-btn">Monthly</button>
                <button class="tab-btn">Yearly</button>
            </div>
            

        </div>

        <!-- Task Groups -->
        <div class="task-groups">
            
            <!-- Group: Today -->
            <div class="task-group expanded">
                <div class="group-header">
                    <h2>Today - 31 July 2026</h2>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                </div>
                
                <div class="group-content">
                    
                    <!-- Task Row 1 -->
                    <div class="task-row">
                        <div class="col-checkbox">
                            <div class="custom-check checked">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                        </div>
                        <div class="col-name">Read 20 pages</div>
                        <div class="col-category"><span class="badge-cat purple">Daily</span></div>
                        <div class="col-time">08:00 AM</div>
                        <div class="col-priority"><span class="badge-pri orange">Medium</span></div>
                        <div class="col-status"><span class="badge-stat green">Completed</span></div>
                        <div class="col-menu">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="5" r="1"></circle>
                                <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                        </div>
                    </div>
                    
                    <!-- Task Row 2 -->
                    <div class="task-row">
                        <div class="col-checkbox">
                            <div class="custom-check checked">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                        </div>
                        <div class="col-name">Exercise for 30 min</div>
                        <div class="col-category"><span class="badge-cat purple">Daily</span></div>
                        <div class="col-time">08:30 AM</div>
                        <div class="col-priority"><span class="badge-pri green">Low</span></div>
                        <div class="col-status"><span class="badge-stat green">Completed</span></div>
                        <div class="col-menu">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="5" r="1"></circle>
                                <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                        </div>
                    </div>

                    <!-- Task Row 3 -->
                    <div class="task-row">
                        <div class="col-checkbox">
                            <div class="custom-check empty"></div>
                        </div>
                        <div class="col-name">Learn JavaScript DOM</div>
                        <div class="col-category"><span class="badge-cat purple">Daily</span></div>
                        <div class="col-time">10:00 AM</div>
                        <div class="col-priority"><span class="badge-pri orange">Medium</span></div>
                        <div class="col-status"><span class="badge-stat red">Pending</span></div>
                        <div class="col-menu">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="5" r="1"></circle>
                                <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                        </div>
                    </div>

                    <!-- Task Row 4 -->
                    <div class="task-row">
                        <div class="col-checkbox">
                            <div class="custom-check empty-red"></div>
                        </div>
                        <div class="col-name">Build a mini project</div>
                        <div class="col-category"><span class="badge-cat purple">Daily</span></div>
                        <div class="col-time">03:00 PM</div>
                        <div class="col-priority"><span class="badge-pri red">High</span></div>
                        <div class="col-status"><span class="badge-stat red">Pending</span></div>
                        <div class="col-menu">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="5" r="1"></circle>
                                <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                        </div>
                    </div>

                    <!-- Task Row 5 -->
                    <div class="task-row">
                        <div class="col-checkbox">
                            <div class="custom-check empty"></div>
                        </div>
                        <div class="col-name">Revise DBMS Notes</div>
                        <div class="col-category"><span class="badge-cat purple">Daily</span></div>
                        <div class="col-time">07:00 PM</div>
                        <div class="col-priority"><span class="badge-pri green">Low</span></div>
                        <div class="col-status"><span class="badge-stat red">Pending</span></div>
                        <div class="col-menu">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="5" r="1"></circle>
                                <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Group: Tomorrow -->
            <div class="task-group collapsed">
                <div class="group-header">
                    <h2>Tomorrow - 1 August 2026 (4)</h2>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </div>

            <!-- Group: Saturday -->
            <div class="task-group collapsed">
                <div class="group-header">
                    <h2>Saturday - 2 August 2026 (5)</h2>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </div>

        </div>
    </div>

    <!-- Scripts -->
    <script src="js/storage.js"></script>
    <script src="js/store.js"></script>
    <script src="js/modules/tasks.js"></script>
    <script src="js/app.js"></script>
`,
        'goals.html': `<div class="page-container goals-container">
        
        <!-- Header -->
        <header class="top-nav">
            <div class="page-title-area">
                <div class="title-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a594f9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                </div>
                <div class="title-text">
                    <h1>Goals</h1>
                    <p>Track your goals and stay motivated.</p>
                </div>
            </div>
            
            <div class="nav-actions">
                <div class="search-bar">
                    <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" placeholder="Search tasks...">
                </div>
                <button class="icon-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <span class="badge">1</span>
                </button>
                <button class="icon-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </button>
                <div class="avatar-container">
                    <img src="ui/desh_bord.png" alt="User Avatar" onerror="this.style.display='none'">
                </div>
            </div>
        </header>

        <!-- Goals Controls -->
        <div class="goals-controls">
            <div class="filter-pills">
                <button class="filter-pill active">All Goals</button>
                <button class="filter-pill">Active</button>
                <button class="filter-pill">Completed</button>
                <button class="filter-pill">Archived</button>
            </div>
            <button class="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add Goal
            </button>
        </div>

        <!-- Goals List -->
        <div class="goals-list">
            
            <!-- Goal Card 1 -->
            <div class="goal-card">
                <div class="goal-header">
                    <div class="goal-icon icon-purple">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                    </div>
                    <div class="goal-info">
                        <h3>Become Full Stack Developer</h3>
                        <p>Master Frontend, Backend and DevOps</p>
                    </div>
                    <div class="goal-actions">
                        <span class="status-badge status-active">Active</span>
                        <button class="menu-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                        </button>
                    </div>
                </div>
                
                <div class="goal-progress">
                    <div class="progress-track">
                        <div class="progress-fill fill-purple" style="width: 65%;"></div>
                    </div>
                </div>
                
                <div class="goal-footer">
                    <div class="goal-date">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        01 Jan 2026 - 31 Dec 2026
                    </div>
                    <span class="category-badge">Daily</span>
                </div>
            </div>

            <!-- Goal Card 2 -->
            <div class="goal-card">
                <div class="goal-header">
                    <div class="goal-icon icon-green">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                        </svg>
                    </div>
                    <div class="goal-info">
                        <h3>Maintain CGPA above 8.5</h3>
                        <p>Focus on learning and consistent practice</p>
                    </div>
                    <div class="goal-actions">
                        <span class="status-badge status-active">Active</span>
                        <button class="menu-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                        </button>
                    </div>
                </div>
                
                <div class="goal-progress">
                    <div class="progress-track">
                        <div class="progress-fill fill-green" style="width: 80%;"></div>
                    </div>
                </div>
                
                <div class="goal-footer">
                    <div class="goal-date">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        01 Jan 2026 - 31 Dec 2026
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    <span class="category-badge">Daily</span>
                </div>
            </div>

            <!-- Goal Card 3 -->
            <div class="goal-card">
                <div class="goal-header">
                    <div class="goal-icon icon-orange">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        </svg>
                    </div>
                    <div class="goal-info">
                        <h3>Read 20 Books This Year</h3>
                        <p>Improve knowledge and vocabulary</p>
                    </div>
                    <div class="goal-actions">
                        <span class="status-badge status-active">Active</span>
                        <button class="menu-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                        </button>
                    </div>
                </div>
                
                <div class="goal-progress">
                    <div class="progress-track">
                        <div class="progress-fill fill-orange" style="width: 35%;"></div>
                    </div>
                </div>
                
                <div class="goal-footer">
                    <div class="goal-date">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        01 Jan 2026 - 31 Dec 2026
                    </div>
                    <span class="category-badge">Monthly</span>
                </div>
            </div>

            <!-- Goal Card 4 -->
            <div class="goal-card">
                <div class="goal-header">
                    <div class="goal-icon icon-purple-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <circle cx="12" cy="12" r="6"></circle>
                            <circle cx="12" cy="12" r="2"></circle>
                        </svg>
                    </div>
                    <div class="goal-info">
                        <h3>Get Internship</h3>
                        <p>Apply and crack a good internship</p>
                    </div>
                    <div class="goal-actions">
                        <span class="status-badge status-active-red">Active</span>
                        <button class="menu-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                        </button>
                    </div>
                </div>
                
                <div class="goal-progress">
                    <div class="progress-track">
                        <div class="progress-fill fill-red" style="width: 25%;"></div>
                    </div>
                </div>
                
                <div class="goal-footer">
                    <div class="goal-date">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        01 Jan 2026 - 31 Dec 2026
                    </div>
                    <span class="category-badge">Yearly</span>
                </div>
            </div>

        </div>
    `,
        'analytics.html': `<div class="page-container analytics-container">
        
        <!-- Header -->
        <header class="top-nav">
            <div class="page-title-area">
                <div class="title-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a594f9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                </div>
                <div class="title-text">
                    <h1>Analytics</h1>
                    <p>Visualize your productivity and progress.</p>
                </div>
            </div>
            
            <div class="nav-actions">
                <div class="search-bar">
                    <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" placeholder="Search tasks...">
                </div>
                <button class="icon-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <span class="badge">1</span>
                </button>
                <button class="icon-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </button>
                <div class="avatar-container">
                    <img src="ui/desh_bord.png" alt="User Avatar" onerror="this.style.display='none'">
                </div>
            </div>
        </header>

        <!-- Filters & Controls -->
        <div class="analytics-controls">
            <div class="filter-pills">
                <button class="filter-pill active">Overview</button>
                <button class="filter-pill">Tasks</button>
                <button class="filter-pill">Goals</button>
                <button class="filter-pill">Streaks</button>
            </div>
            <div class="dropdown-wrapper">
                <select class="custom-select">
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Year</option>
                </select>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
        </div>

        <!-- Top Stats Cards -->
        <div class="stats-grid-4">
            
            <!-- Total Tasks -->
            <div class="stat-card">
                <div class="stat-header">
                    <h4>Total Tasks</h4>
                    <div class="stat-icon icon-purple-bg">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M9 14h6"></path><path d="M9 18h6"></path><path d="M9 10h.01"></path></svg>
                    </div>
                </div>
                <h2>48</h2>
                <div class="stat-trend trend-purple">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                    12% from last week
                </div>
            </div>

            <!-- Completed -->
            <div class="stat-card stat-green">
                <div class="stat-header">
                    <h4>Completed</h4>
                    <div class="stat-icon icon-green-bg">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                </div>
                <h2>32</h2>
                <div class="stat-trend trend-green">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                    18% from last week
                </div>
            </div>

            <!-- Completion Rate -->
            <div class="stat-card stat-blue">
                <div class="stat-header">
                    <h4>Completion Rate</h4>
                    <div class="stat-icon icon-blue-bg">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                    </div>
                </div>
                <h2>66%</h2>
                <div class="stat-trend trend-blue">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                    8% from last week
                </div>
            </div>

            <!-- Productivity Score -->
            <div class="stat-card stat-orange">
                <div class="stat-header">
                    <h4>Productivity Score</h4>
                    <div class="stat-icon icon-orange-bg">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </div>
                </div>
                <h2>85/100</h2>
                <div class="stat-trend trend-orange">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                    10% from last week
                </div>
            </div>
            
        </div>

        <!-- Middle Charts -->
        <div class="charts-grid-2">
            
            <!-- Task Completion Overview (Bar Chart) -->
            <div class="chart-card">
                <h3>Task Completion Overview</h3>
                <div class="bar-chart-container">
                    <div class="y-axis">
                        <span>100%</span>
                        <span>75%</span>
                        <span>50%</span>
                        <span>25%</span>
                        <span>0%</span>
                    </div>
                    <div class="bar-chart-area">
                        <!-- Grid Lines -->
                        <div class="grid-line" style="bottom: 100%;"></div>
                        <div class="grid-line" style="bottom: 75%;"></div>
                        <div class="grid-line" style="bottom: 50%;"></div>
                        <div class="grid-line" style="bottom: 25%;"></div>
                        <div class="grid-line" style="bottom: 0;"></div>
                        
                        <!-- Bars -->
                        <div class="bar-group">
                            <div class="bar" style="height: 65%;"></div>
                            <span class="x-label">Mon</span>
                        </div>
                        <div class="bar-group">
                            <div class="bar" style="height: 45%;"></div>
                            <span class="x-label">Tue</span>
                        </div>
                        <div class="bar-group">
                            <div class="bar" style="height: 30%;"></div>
                            <span class="x-label">Wed</span>
                        </div>
                        <div class="bar-group">
                            <div class="bar" style="height: 50%;"></div>
                            <span class="x-label">Thu</span>
                        </div>
                        <div class="bar-group">
                            <div class="bar" style="height: 65%;"></div>
                            <span class="x-label">Fri</span>
                        </div>
                        <div class="bar-group">
                            <div class="bar" style="height: 85%;"></div>
                            <span class="x-label">Sat</span>
                        </div>
                        <div class="bar-group">
                            <div class="bar" style="height: 50%;"></div>
                            <span class="x-label">Sun</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tasks by Priority (Donut Chart) -->
            <div class="chart-card">
                <h3>Tasks by Priority</h3>
                <div class="donut-chart-container">
                    <div class="donut-visual">
                        <div class="donut-ring">
                            <div class="donut-inner">
                                <h2>48</h2>
                                <p>Total</p>
                            </div>
                        </div>
                    </div>
                    <div class="donut-legend">
                        <div class="leg-item">
                            <span class="dot bg-red"></span>
                            <span class="leg-text">High (12)</span>
                        </div>
                        <div class="leg-item">
                            <span class="dot bg-orange"></span>
                            <span class="leg-text">Medium (20)</span>
                        </div>
                        <div class="leg-item">
                            <span class="dot bg-blue"></span>
                            <span class="leg-text">Low (16)</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

        <!-- Bottom Chart -->
        <div class="charts-grid-1">
            
            <!-- Productivity Trend (Line Chart) -->
            <div class="chart-card">
                <div class="chart-header">
                    <h3>Productivity Trend</h3>
                    <div class="dropdown-wrapper">
                        <select class="custom-select">
                            <option>This Week</option>
                            <option>This Month</option>
                        </select>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </div>
                
                <div class="line-chart-container">
                    <div class="y-axis">
                        <span>100%</span>
                        <span>50%</span>
                        <span>0%</span>
                    </div>
                    <div class="line-chart-area">
                        <!-- Grid Lines -->
                        <div class="grid-line" style="bottom: 100%;"></div>
                        <div class="grid-line" style="bottom: 50%;"></div>
                        <div class="grid-line" style="bottom: 0;"></div>
                        
                        <!-- SVG Line -->
                        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" class="svg-line">
                            <defs>
                                <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stop-color="#7257ff" stop-opacity="0.3"></stop>
                                    <stop offset="100%" stop-color="#7257ff" stop-opacity="0"></stop>
                                </linearGradient>
                            </defs>
                            <!-- The filled area -->
                            <path d="M 0 95 
                                     C 15 70, 20 70, 25 70 
                                     C 35 70, 35 60, 45 60 
                                     C 55 60, 55 70, 65 65 
                                     C 75 60, 75 40, 85 50 
                                     C 95 60, 95 40, 100 45
                                     L 100 100 L 0 100 Z" fill="url(#gradientFill)"></path>
                            <!-- The line -->
                            <path d="M 0 95 
                                     C 15 70, 20 70, 25 70 
                                     C 35 70, 35 60, 45 60 
                                     C 55 60, 55 70, 65 65 
                                     C 75 60, 75 40, 85 50 
                                     C 95 60, 95 40, 100 45" fill="none" stroke="#7257ff" stroke-width="2" vector-effect="non-scaling-stroke"></path>
                        </svg>

                        <!-- Nodes -->
                        <div class="line-nodes">
                            <div class="node-col"><div class="node" style="bottom: 5%;"></div><span class="x-label">Mon</span></div>
                            <div class="node-col"><div class="node" style="bottom: 30%;"></div><span class="x-label">Tue</span></div>
                            <div class="node-col"><div class="node" style="bottom: 40%;"></div><span class="x-label">Wed</span></div>
                            <div class="node-col"><div class="node" style="bottom: 35%;"></div><span class="x-label">Thu</span></div>
                            <div class="node-col"><div class="node" style="bottom: 60%;"></div><span class="x-label">Fri</span></div>
                            <div class="node-col"><div class="node" style="bottom: 50%;"></div><span class="x-label">Sat</span></div>
                            <div class="node-col"><div class="node" style="bottom: 55%;"></div><span class="x-label">Sun</span></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    `,
        'settings.html': `<div class="page-container settings-container">
        
        <!-- Header -->
        <header class="top-nav">
            <div class="page-title-area">
                <div class="title-text">
                    <h1>Settings</h1>
                    <p>Manage your account and preferences</p>
                </div>
            </div>
            
            <div class="nav-actions">
                <div class="search-bar premium-search">
                    <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" placeholder="Search settings...">
                    <div class="shortcut-hint">⌘K</div>
                </div>
                <button class="icon-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                </button>
                <div class="avatar-container">
                    <img src="ui/desh_bord.png" alt="User Avatar" onerror="this.style.display='none'">
                </div>
            </div>
        </header>

        <!-- Premium Settings Layout -->
        <div class="settings-premium-layout">
            
            <!-- Sticky Left Navigation -->
            <nav class="settings-side-nav">
                <div class="nav-group">
                    <h5 class="nav-group-title">Account</h5>
                    <a href="#sec-profile" class="side-nav-item active">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        Profile
                    </a>
                    <a href="#sec-security" class="side-nav-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        Security
                    </a>
                </div>
                
                <div class="nav-group">
                    <h5 class="nav-group-title">Application</h5>
                    <a href="#sec-appearance" class="side-nav-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                        Appearance
                    </a>
                    <a href="#sec-notifications" class="side-nav-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                        Notifications
                    </a>
                    <a href="#sec-preferences" class="side-nav-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        Preferences
                    </a>
                </div>
                
                <div class="nav-group">
                    <h5 class="nav-group-title">System</h5>
                    <a href="#sec-about" class="side-nav-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        About
                    </a>
                </div>
            </nav>

            <!-- Scrollable Content -->
            <div class="settings-body">
                
                <!-- SECTION: PROFILE -->
                <section id="sec-profile" class="settings-section">
                    <div class="section-header">
                        <h2>Profile</h2>
                        <p>Manage your personal information and identity.</p>
                    </div>
                    
                    <div class="premium-card">
                        <div class="profile-header-premium">
                            <div class="avatar-glow-wrapper">
                                <img src="ui/desh_bord.png" alt="Avatar">
                                <button class="upload-btn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                </button>
                            </div>
                            <div class="profile-title">
                                <h3>Niloy Ghosh</h3>
                                <span>Student</span>
                            </div>
                        </div>

                        <div class="premium-form-grid">
                            <div class="form-field">
                                <label>Full Name</label>
                                <input type="text" value="Niloy Ghosh">
                            </div>
                            <div class="form-field">
                                <label>Email Address</label>
                                <input type="email" value="niloy@example.com">
                            </div>
                            <div class="form-field">
                                <label>University</label>
                                <input type="text" value="Chandigarh University">
                            </div>
                            <div class="form-field">
                                <label>Course</label>
                                <input type="text" value="B.E. Computer Science">
                            </div>
                            <div class="form-field full-width">
                                <label>Country</label>
                                <div class="custom-select-box">
                                    <span>India</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </div>
                            </div>
                            <div class="form-field full-width">
                                <label>Short Bio</label>
                                <textarea rows="3">Focused on building a better version of myself everyday.</textarea>
                            </div>
                        </div>

                        <div class="card-footer">
                            <p>This information will be displayed publicly.</p>
                            <button class="btn-primary-glow">Save Changes</button>
                        </div>
                    </div>
                </section>

                <!-- SECTION: APPEARANCE -->
                <section id="sec-appearance" class="settings-section">
                    <div class="section-header">
                        <h2>Appearance</h2>
                        <p>Customize the look and feel of your workspace.</p>
                    </div>

                    <div class="premium-card">
                        
                        <div class="appearance-grid">
                            
                            <!-- Left Controls -->
                            <div class="appearance-controls">
                                
                                <div class="control-group">
                                    <label>Theme</label>
                                    <div class="segmented-control-premium">
                                        <button class="seg-item">Light</button>
                                        <button class="seg-item active">Dark</button>
                                        <button class="seg-item">System</button>
                                    </div>
                                </div>

                                <div class="control-group">
                                    <label>Accent Color</label>
                                    <div class="color-picker-premium">
                                        <div class="color-swatch bg-purple active"></div>
                                        <div class="color-swatch bg-blue"></div>
                                        <div class="color-swatch bg-green"></div>
                                        <div class="color-swatch bg-orange"></div>
                                        <div class="color-swatch bg-teal"></div>
                                        <div class="color-swatch custom-swatch">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                        </div>
                                    </div>
                                </div>

                                <div class="control-group">
                                    <label>Font Size</label>
                                    <div class="segmented-control-premium">
                                        <button class="seg-item">Small</button>
                                        <button class="seg-item active">Medium</button>
                                        <button class="seg-item">Large</button>
                                    </div>
                                </div>

                                <div class="control-group">
                                    <label>UI Density</label>
                                    <div class="segmented-control-premium">
                                        <button class="seg-item active">Comfortable</button>
                                        <button class="seg-item">Compact</button>
                                    </div>
                                </div>

                                <div class="control-group">
                                    <label>Corner Radius</label>
                                    <div class="segmented-control-premium">
                                        <button class="seg-item">Small</button>
                                        <button class="seg-item active">Medium</button>
                                        <button class="seg-item">Large</button>
                                    </div>
                                </div>
                            </div>

                            <!-- Right Preview -->
                            <div class="appearance-preview">
                                <label>Live Preview</label>
                                <div class="preview-card-mockup">
                                    <div class="mock-header">
                                        <div class="mock-dot bg-red"></div>
                                        <div class="mock-dot bg-orange"></div>
                                        <div class="mock-dot bg-green"></div>
                                    </div>
                                    <div class="mock-body">
                                        <div class="mock-line title"></div>
                                        <div class="mock-line text"></div>
                                        <div class="mock-line text short"></div>
                                        
                                        <div class="mock-button">
                                            <span>Update</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <!-- SECTION: NOTIFICATIONS -->
                <section id="sec-notifications" class="settings-section">
                    <div class="section-header">
                        <h2>Notifications</h2>
                        <p>Decide what alerts you receive and how.</p>
                    </div>

                    <div class="premium-card list-card">
                        
                        <div class="list-item-premium">
                            <div class="item-info">
                                <h4>Task Reminders</h4>
                                <p>Get notified before a task is due.</p>
                            </div>
                            <label class="ios-switch">
                                <input type="checkbox" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div class="list-item-premium">
                            <div class="item-info">
                                <h4>Goal Reminders</h4>
                                <p>Monthly check-ins for your active goals.</p>
                            </div>
                            <label class="ios-switch">
                                <input type="checkbox" checked>
                                <span class="slider"></span>
                            </label>
                        </div>

                        <div class="list-item-premium">
                            <div class="item-info">
                                <h4>Desktop Notifications</h4>
                                <p>Show push notifications on your system.</p>
                            </div>
                            <label class="ios-switch">
                                <input type="checkbox" checked>
                                <span class="slider"></span>
                            </label>
                        </div>

                        <div class="list-item-premium">
                            <div class="item-info">
                                <h4>Email Notifications</h4>
                                <p>Receive important updates via email.</p>
                            </div>
                            <label class="ios-switch">
                                <input type="checkbox">
                                <span class="slider"></span>
                            </label>
                        </div>

                        <div class="list-item-premium">
                            <div class="item-info">
                                <h4>Achievement Notifications</h4>
                                <p>Celebrate when you unlock a new badge.</p>
                            </div>
                            <label class="ios-switch">
                                <input type="checkbox" checked>
                                <span class="slider"></span>
                            </label>
                        </div>

                        <div class="list-item-premium">
                            <div class="item-info">
                                <h4>Reminder Sound</h4>
                                <p>Play a short chime when a notification arrives.</p>
                            </div>
                            <label class="ios-switch">
                                <input type="checkbox" checked>
                                <span class="slider"></span>
                            </label>
                        </div>

                        <div class="list-item-premium">
                            <div class="item-info">
                                <h4>Daily Summary</h4>
                                <p>A brief overview of your day every morning.</p>
                            </div>
                            <label class="ios-switch">
                                <input type="checkbox">
                                <span class="slider"></span>
                            </label>
                        </div>

                        <div class="list-item-premium">
                            <div class="item-info">
                                <h4>Weekly Summary</h4>
                                <p>A comprehensive review every Sunday.</p>
                            </div>
                            <label class="ios-switch">
                                <input type="checkbox" checked>
                                <span class="slider"></span>
                            </label>
                        </div>

                    </div>
                </section>

                <!-- SECTION: SECURITY & ACCOUNT -->
                <section id="sec-security" class="settings-section">
                    <div class="section-header">
                        <h2>Account Actions</h2>
                        <p>Manage your data, security, and account lifecycle.</p>
                    </div>

                    <div class="action-cards-grid">
                        
                        <div class="action-card">
                            <div class="action-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            </div>
                            <div class="action-text">
                                <h4>Change Password</h4>
                                <p>Update your authentication credentials.</p>
                            </div>
                            <button class="btn-secondary">Update</button>
                        </div>

                        <div class="action-card">
                            <div class="action-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            </div>
                            <div class="action-text">
                                <h4>Export Data</h4>
                                <p>Download a JSON backup of your workspace.</p>
                            </div>
                            <button class="btn-secondary">Export</button>
                        </div>

                        <div class="action-card">
                            <div class="action-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            </div>
                            <div class="action-text">
                                <h4>Import Data</h4>
                                <p>Restore your workspace from a backup file.</p>
                            </div>
                            <button class="btn-secondary">Import</button>
                        </div>

                        <div class="action-card">
                            <div class="action-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            </div>
                            <div class="action-text">
                                <h4>Logout</h4>
                                <p>Securely end your current session.</p>
                            </div>
                            <a href="index.html" class="btn-secondary" style="text-decoration: none;">Logout</a>
                        </div>
                    </div>

                    <div class="premium-card danger-zone">
                        <div class="danger-info">
                            <h4>Delete Account</h4>
                            <p>Permanently delete your account and all of your data. This action cannot be undone.</p>
                        </div>
                        <button class="btn-danger-glow">Delete Account</button>
                    </div>
                </section>

                <!-- SECTION: ABOUT -->
                <section id="sec-about" class="settings-section">
                    <div class="section-header">
                        <h2>About</h2>
                        <p>Application details and legal information.</p>
                    </div>

                    <div class="premium-card list-card">
                        <div class="list-item-premium link-item">
                            <div class="item-info">
                                <h4>Application Version</h4>
                            </div>
                            <span class="version-badge">v2.4.1</span>
                        </div>
                        
                        <a href="#" class="list-item-premium link-item">
                            <div class="item-info">
                                <h4>Developer</h4>
                            </div>
                            <div class="link-right">
                                <span>Niloy Ghosh</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </div>
                        </a>

                        <a href="#" class="list-item-premium link-item">
                            <div class="item-info">
                                <h4>GitHub Repository</h4>
                            </div>
                            <div class="link-right">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </div>
                        </a>

                        <a href="#" class="list-item-premium link-item">
                            <div class="item-info">
                                <h4>License</h4>
                            </div>
                            <div class="link-right">
                                <span>MIT License</span>
                            </div>
                        </a>

                        <div class="about-footer-links">
                            <a href="#">Privacy Policy</a>
                            <span class="dot"></span>
                            <a href="#">Terms of Service</a>
                            <span class="dot"></span>
                            <a href="#">Contact Support</a>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    `
    };

    const navLinks = document.querySelectorAll('.sidebar-nav .nav-item, .sidebar-bottom .nav-item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            let href = link.getAttribute('href');
            if (!href || href === '#' || href === 'index.html') return;
            
            e.preventDefault();
            
            navLinks.forEach(n => n.classList.remove('active'));
            link.classList.add('active');

            if (pageCache[href]) {
                mainContentContainer.innerHTML = pageCache[href];
                reinitializeScripts(href);
            } else {
                mainContentContainer.innerHTML = '<div style="padding: 40px; color: white;"><h2>Work in progress</h2><p>This page has not been built yet.</p></div>';
            }
        });
    });

    function reinitializeScripts(href) {
        if (href === 'tasks.html' && window.initTasks) {
            window.initTasks();
        } else if (href === 'dashboard.html' && window.initDashboard) {
            window.initDashboard();
        } else if (href === 'calendar.html' && window.initCalendar) {
            window.initCalendar();
        } else if (href === 'goals.html' && window.initGoals) {
            window.initGoals();
        } else if (href === 'analytics.html' && window.initAnalytics) {
            window.initAnalytics();
        } else if (href === 'settings.html' && window.initSettings) {
            window.initSettings();
        }
    }
});
