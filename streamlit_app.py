import streamlit as st
import base64
from pathlib import Path

# Set page config for a wider layout
st.set_page_config(
    page_title="CyberFlask Portfolio",
    page_icon="🛡️",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS
def local_css(file_name):
    with open(file_name) as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

try:
    local_css("static/css/index.css")
except:
    pass

# Custom CSS for dark mode and styling
st.markdown("""
<style>
    /* Dark mode styles */
    .dark {
        background-color: #101922;
        color: white;
    }
    
    .stButton button {
        background-color: #137fec;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-weight: bold;
    }
    
    .stButton button:hover {
        background-color: rgba(19, 127, 236, 0.9);
    }
    
    /* Header styling */
    .header {
        padding: 1rem;
        background: rgba(246, 247, 248, 0.9);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(229, 231, 235, 0.2);
    }
    
    /* Card styling */
    .card {
        background: white;
        border-radius: 0.5rem;
        padding: 1rem;
        margin: 1rem 0;
        border: 1px solid rgba(229, 231, 235, 0.2);
    }
    
    [data-testid="stSidebarNav"] {
        background-image: none;
        padding-top: 1.5rem;
    }
    
    [data-testid="stSidebarNav"]::before {
        content: "Navigation";
        margin-left: 20px;
        margin-top: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        position: relative;
        top: 0;
        left: 0;
    }
</style>
""", unsafe_allow_html=True)

# Navigation
def create_navbar():
    cols = st.columns([1, 1, 1, 1, 1, 1])
    pages = {
        "Home": cols[0],
        "Projects": cols[1],
        "Skills": cols[2],
        "Portfolio": cols[3],
        "Certificates": cols[4],
        "Contact": cols[5]
    }
    
    clicked_page = None
    for page, col in pages.items():
        if col.button(page):
            clicked_page = page
            st.session_state.current_page = page
    
    return clicked_page

# Initialize session state for navigation
if 'current_page' not in st.session_state:
    st.session_state.current_page = "Home"

# Header
st.markdown("""
<div class="header">
    <h1 style="text-align: center; color: #137fec;">CyberFlask Portfolio</h1>
</div>
""", unsafe_allow_html=True)

# Navigation bar
clicked_page = create_navbar()
if clicked_page:
    st.session_state.current_page = clicked_page

# Content based on current page
if st.session_state.current_page == "Home":
    st.markdown("""
    <div style="text-align: center; padding: 2rem;">
        <h1>Building a more secure future, one line of code at a time</h1>
        <p>Merging a Flask project with cybersecurity achievements to showcase a unique blend of skills.</p>
    </div>
    """, unsafe_allow_html=True)
    
    st.button("View My Work", key="view_work")

elif st.session_state.current_page == "Projects":
    st.header("My Projects")
    st.write("A collection of my recent projects, demonstrating my skills in web development and backend engineering.")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.card(
            title="E-commerce Platform",
            text="A fully functional e-commerce website built with secure payment integration."
        )
    
    with col2:
        st.card(
            title="Blog Application",
            text="A feature-rich blog with user authentication and content management."
        )
    
    with col3:
        st.card(
            title="Task Management API",
            text="A RESTful API for managing tasks, built with security in mind."
        )

elif st.session_state.current_page == "Skills":
    st.header("Technical Skills")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("""
        ### 💻 Development Skills
        - Python & Web Frameworks
        - Database Management
        - RESTful API Design
        - Frontend Integration
        - Deployment & DevOps
        """)
    
    with col2:
        st.markdown("""
        ### 🛡️ Cybersecurity Skills
        - Penetration Testing
        - Network Security
        - Incident Response
        - Security Auditing & Compliance
        - Cryptography
        """)

elif st.session_state.current_page == "Portfolio":
    st.header("My Cybersecurity Accomplishments")
    
    st.markdown("""
    #### 🛡️ Penetration Testing Report
    Identified and reported critical vulnerabilities in a web application, leading to enhanced security measures.
    
    #### 🔐 Incident Response Simulation
    Led a team in a simulated cyber attack, successfully containing the breach and restoring systems.
    
    #### 📋 Security Policy Development
    Developed and implemented a comprehensive security policy for a mid-sized organization.
    """)

elif st.session_state.current_page == "Certificates":
    st.header("My Certifications")
    
    cert_col1, cert_col2, cert_col3 = st.columns(3)
    
    with cert_col1:
        st.markdown("### 🏅 Certified Ethical Hacker (CEH)")
    
    with cert_col2:
        st.markdown("### 🏅 CompTIA Security+")
    
    with cert_col3:
        st.markdown("### 🏅 CISSP")

elif st.session_state.current_page == "Contact":
    st.header("Get In Touch")
    
    with st.form("contact_form"):
        name = st.text_input("Name")
        email = st.text_input("Email")
        message = st.text_area("Message")
        submitted = st.form_submit_button("Send Message")
        
        if submitted:
            st.success("Thank you for your message! We'll get back to you soon.")
    
    st.markdown("""
    ### Connect With Me
    [![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)
    [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/)
    [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/)
    """)