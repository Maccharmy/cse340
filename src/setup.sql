--
-- PostgreSQL database dump
--

\restrict tLI6t8paDyCDNFPFhGjYX9ppTTl37wHD1UjyultOHWjQAuZbEWTAfCt5RRdQXVe

-- Dumped from database version 18.6 (Debian 18.6-1.pgdg12+2)
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.category (
    category_id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text
);


--
-- Name: category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.category_category_id_seq OWNED BY public.category.category_id;


--
-- Name: organization; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.organization (
    organization_id integer NOT NULL,
    name character varying(150) NOT NULL,
    description text NOT NULL,
    contact_email character varying(255) NOT NULL,
    logo_filename character varying(255) NOT NULL
);


--
-- Name: organization_organization_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.organization_organization_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: organization_organization_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.organization_organization_id_seq OWNED BY public.organization.organization_id;


--
-- Name: project; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project (
    project_id integer NOT NULL,
    organization_id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    location character varying(255) NOT NULL,
    date date NOT NULL
);


--
-- Name: project_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_category (
    project_id integer NOT NULL,
    category_id integer NOT NULL
);


--
-- Name: project_project_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_project_id_seq OWNED BY public.project.project_id;


--
-- Name: category category_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category ALTER COLUMN category_id SET DEFAULT nextval('public.category_category_id_seq'::regclass);


--
-- Name: organization organization_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization ALTER COLUMN organization_id SET DEFAULT nextval('public.organization_organization_id_seq'::regclass);


--
-- Name: project project_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project ALTER COLUMN project_id SET DEFAULT nextval('public.project_project_id_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.category (category_id, name, description) FROM stdin;
1	Environment	Projects focused on environmental sustainability
2	Health	Projects providing healthcare and wellness support
3	Education	Projects supporting learning and tutoring initiatives
\.


--
-- Data for Name: organization; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.organization (organization_id, name, description, contact_email, logo_filename) FROM stdin;
2	GreenHarvest Growers	An urban farming collective promoting food sustainability and education in local neighborhoods.	contact@greenharvest.org	greenharvest-logo.png
3	UnityServe Volunteers	A volunteer coordination group supporting local charities and service initiatives.	hello@unityserve.org	unityserve-logo.png
4	Hope Horizon	Provides shelter and support for homeless families.	contact@hopehorizon.org	hopehorizon-logo.png
5	Tech4Youth	Offers coding and digital literacy programs for young people.	info@tech4youth.org	tech4youth-logo.png
6	FoodShare Network	Distributes surplus food to communities in need.	hello@foodshare.org	foodshare-logo.png
7	CleanWater Initiative	Works to provide clean drinking water in rural areas.	support@cleanwater.org	cleanwater-logo.png
8	ArtsConnect	Promotes arts education and cultural exchange programs.	team@artsconnect.org	artsconnect-logo.png
9	SafeSteps	Supports victims of domestic violence with counseling and housing.	help@safesteps.org	safesteps-logo.png
10	Global Health Alliance	Runs vaccination and health awareness campaigns worldwide.	info@globalhealth.org	globalhealth-logo.png
11	EduBridge Foundation	Provides scholarships and mentorship for underprivileged students.	contact@edubridge.org	edubridge-logo.png
12	EcoGuardians	Focuses on wildlife conservation and environmental advocacy.	hello@ecoguardians.org	ecoguardians-logo.png
13	Community Builders	Develops affordable housing and community centers.	support@communitybuilders.org	communitybuilders-logo.png
14	Bright Minds Academy	Offers after-school tutoring and enrichment programs.	info@brightminds.org	brightminds-logo.png
15	WellnessWorks	Promotes mental health awareness and counseling services.	contact@wellnessworks.org	wellnessworks-logo.png
16	Community Hope Center	An organization that provides service opportunities for the local community.	community@example.com	placeholder-logo.png
1	Bright Furure Builders	A nonprofit focused on improving community infrastructure through sustainable construction projects.	info@brightfuturebuilders.org	brightfuture-logo.png
\.


--
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.project (project_id, organization_id, title, description, location, date) FROM stdin;
1	1	Tree Planting	Community tree planting event	City Park	2026-09-25
2	1	Beach Cleanup	Volunteers cleaning the shoreline	Sunny Beach	2026-10-01
3	2	Health Fair	Free medical checkups	Town Hall	2026-09-30
4	2	Blood Donation	Organized blood donation camp	Hospital Grounds	2026-10-05
5	3	Tutoring Program	Helping students with homework	Library	2026-09-28
6	4	Community Housing Build	Constructing affordable homes for families in need.	City Center	2026-10-15
7	5	Youth Coding Bootcamp	Teaching programming skills to teenagers.	Tech Hub	2026-11-01
8	6	Food Distribution Drive	Delivering food packages to low-income households.	Community Hall	2026-10-20
9	7	Village Water Wells	Installing clean water wells in rural villages.	Riverside	2026-11-05
10	8	Art Festival	Celebrating local artists and cultural heritage.	Town Square	2026-10-25
11	9	Domestic Violence Awareness Walk	Raising awareness and support for victims.	Main Street	2026-11-10
13	11	Scholarship Award Ceremony	Recognizing students with scholarships.	University Auditorium	2026-10-12
14	12	Wildlife Conservation Workshop	Educating communities on protecting endangered species.	Nature Reserve	2026-11-02
15	13	Community Center Renovation	Renovating spaces for youth and families.	West End	2026-10-18
16	14	Tutoring Marathon	Offering free tutoring sessions for students.	Library	2026-09-28
17	15	Mental Health Seminar	Promoting mental health awareness and counseling.	Conference Hall	2026-11-08
18	10	Community Health Outreach	A community service project providing basic health education and support.	Community Center	2026-10-09
12	10	Vaccination Campaign	Providing free vaccines to children.	Health Center	2026-09-28
\.


--
-- Data for Name: project_category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.project_category (project_id, category_id) FROM stdin;
1	1
2	1
3	2
4	2
5	3
6	1
7	3
8	2
9	1
10	3
11	2
13	3
14	1
15	1
16	3
17	2
12	2
\.


--
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.category_category_id_seq', 5, true);


--
-- Name: organization_organization_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.organization_organization_id_seq', 24, true);


--
-- Name: project_project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.project_project_id_seq', 18, true);


--
-- Name: category category_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_name_key UNIQUE (name);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- Name: organization organization_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY (organization_id);


--
-- Name: project_category project_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_category
    ADD CONSTRAINT project_category_pkey PRIMARY KEY (project_id, category_id);


--
-- Name: project project_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_pkey PRIMARY KEY (project_id);


--
-- Name: project_category fk_cat; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_category
    ADD CONSTRAINT fk_cat FOREIGN KEY (category_id) REFERENCES public.category(category_id) ON DELETE CASCADE;


--
-- Name: project_category fk_proj; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_category
    ADD CONSTRAINT fk_proj FOREIGN KEY (project_id) REFERENCES public.project(project_id) ON DELETE CASCADE;


--
-- Name: project fk_project_org; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT fk_project_org FOREIGN KEY (organization_id) REFERENCES public.organization(organization_id) ON DELETE CASCADE;


-- ============================================
-- Authentication and Authorization (W05)
-- ============================================

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

INSERT INTO roles (role_name, role_description) VALUES
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- PostgreSQL database dump complete
--

\unrestrict tLI6t8paDyCDNFPFhGjYX9ppTTl37wHD1UjyultOHWjQAuZbEWTAfCt5RRdQXVe