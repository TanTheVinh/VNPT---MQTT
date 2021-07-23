<<<<<<< HEAD
/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     7/19/2021 11:36:28 AM                        */
/*==============================================================*/


drop index RELATIONSHIP_4_FK;

drop index DULIEU_PK;
=======
--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: donvi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.donvi (
    iddonvi integer NOT NULL,
    tendonvi character varying(30) NOT NULL
);


ALTER TABLE public.donvi OWNER TO postgres;
>>>>>>> 34dbda849e4c52bee1f7e632e1d3ea79e22b7f74

--
-- Name: donvi_iddonvi_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

<<<<<<< HEAD
drop index RELATIONSHIP_3_FK;

drop index RELATIONSHIP_2_FK;
=======
CREATE SEQUENCE public.donvi_iddonvi_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

>>>>>>> 34dbda849e4c52bee1f7e632e1d3ea79e22b7f74

ALTER TABLE public.donvi_iddonvi_seq OWNER TO postgres;

--
-- Name: donvi_iddonvi_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.donvi_iddonvi_seq OWNED BY public.donvi.iddonvi;


--
-- Name: dulieu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dulieu (
    iddulieu integer NOT NULL,
    idthietbi integer NOT NULL,
    thoigiangui date NOT NULL,
    chitiet text NOT NULL
);


ALTER TABLE public.dulieu OWNER TO postgres;

--
-- Name: dulieu_iddulieu_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

<<<<<<< HEAD
/*==============================================================*/
/* Table: DULIEU                                                */
/*==============================================================*/
create table DULIEU (
   IDDULIEU             SERIAL,
   IDTHIETBI            INT4                 not null,
   THOIGIANGUI          DATE                 not null,
   CHITIET              TEXT                 not null,
   constraint PK_DULIEU primary key (IDDULIEU)
);

/*==============================================================*/
/* Index: DULIEU_PK                                             */
/*==============================================================*/
create unique index DULIEU_PK on DULIEU (
IDDULIEU
);

/*==============================================================*/
/* Index: RELATIONSHIP_4_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_4_FK on DULIEU (
IDTHIETBI
);

/*==============================================================*/
/* Table: LICHSU                                                */
/*==============================================================*/
create table LICHSU (
   IDLICHSU             SERIAL,
   IDNGUOIDUNG          INT4                 null,
   IDTHIETBI            INT4                 not null,
   THOIGIANTT           DATE                 not null,
   THAOTAC              VARCHAR(50)          not null,
   constraint PK_LICHSU primary key (IDLICHSU)
);

/*==============================================================*/
/* Index: LICHSU_PK                                             */
/*==============================================================*/
create unique index LICHSU_PK on LICHSU (
IDLICHSU
);

/*==============================================================*/
/* Index: RELATIONSHIP_2_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_2_FK on LICHSU (
IDNGUOIDUNG
);

/*==============================================================*/
/* Index: RELATIONSHIP_3_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_3_FK on LICHSU (
IDTHIETBI
);

/*==============================================================*/
/* Table: LOAITHIETBI                                           */
/*==============================================================*/
create table LOAITHIETBI (
   IDLOAI               SERIAL,
   TENLOAI              VARCHAR(50)          not null,
   MOTA                 TEXT                 null,
   constraint PK_LOAITHIETBI primary key (IDLOAI)
);

/*==============================================================*/
/* Index: LOAITHIETBI_PK                                        */
/*==============================================================*/
create unique index LOAITHIETBI_PK on LOAITHIETBI (
IDLOAI
);

/*==============================================================*/
/* Table: NGUOIDUNG                                             */
/*==============================================================*/
create table NGUOIDUNG (
   IDNGUOIDUNG          SERIAL,
   TAIKHOOAN            VARCHAR(25)          not null,
   MATKHAU              VARCHAR(50)          not null,
   TENNGUOIDUNG         VARCHAR(20)          not null,
   QUYEN                VARCHAR(20)          not null,
   constraint PK_NGUOIDUNG primary key (IDNGUOIDUNG)
);

/*==============================================================*/
/* Index: NGUOIDUNG_PK                                          */
/*==============================================================*/
create unique index NGUOIDUNG_PK on NGUOIDUNG (
IDNGUOIDUNG
);

/*==============================================================*/
/* Table: THIETBI                                               */
/*==============================================================*/
create table THIETBI (
   IDTHIETBI            SERIAL,
   IDLOAI               INT4                 not null,
   TENTHIETBI           VARCHAR(50)          not null,
   TAIKHOAN             VARCHAR(30)          not null,
   MATKHAU              VARCHAR(50)          not null,
   TRANGTHAI            BOOL                 not null,
   constraint PK_THIETBI primary key (IDTHIETBI)
);

/*==============================================================*/
/* Index: THIETBI_PK                                            */
/*==============================================================*/
create unique index THIETBI_PK on THIETBI (
IDTHIETBI
);

/*==============================================================*/
/* Index: RELATIONSHIP_1_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_1_FK on THIETBI (
IDLOAI
);

alter table DULIEU
   add constraint FK_DULIEU_RELATIONS_THIETBI foreign key (IDTHIETBI)
      references THIETBI (IDTHIETBI)
      on delete restrict on update restrict;

alter table LICHSU
   add constraint FK_LICHSU_RELATIONS_NGUOIDUN foreign key (IDNGUOIDUNG)
      references NGUOIDUNG (IDNGUOIDUNG)
      on delete restrict on update restrict;

alter table LICHSU
   add constraint FK_LICHSU_RELATIONS_THIETBI foreign key (IDTHIETBI)
      references THIETBI (IDTHIETBI)
      on delete restrict on update restrict;

alter table THIETBI
   add constraint FK_THIETBI_RELATIONS_LOAITHIE foreign key (IDLOAI)
      references LOAITHIETBI (IDLOAI)
      on delete restrict on update restrict;
=======
CREATE SEQUENCE public.dulieu_iddulieu_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dulieu_iddulieu_seq OWNER TO postgres;

--
-- Name: dulieu_iddulieu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dulieu_iddulieu_seq OWNED BY public.dulieu.iddulieu;


--
-- Name: lichsu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lichsu (
    idlichsu integer NOT NULL,
    idnguoidung integer,
    idthietbi integer NOT NULL,
    thoigiantt date NOT NULL,
    thaotac character varying(50) NOT NULL
);


ALTER TABLE public.lichsu OWNER TO postgres;

--
-- Name: lichsu_idlichsu_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lichsu_idlichsu_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lichsu_idlichsu_seq OWNER TO postgres;

--
-- Name: lichsu_idlichsu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lichsu_idlichsu_seq OWNED BY public.lichsu.idlichsu;


--
-- Name: loaithietbi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.loaithietbi (
    idloai integer NOT NULL,
    tenloai character varying(50) NOT NULL,
    mota text
);


ALTER TABLE public.loaithietbi OWNER TO postgres;

--
-- Name: loaithietbi_idloai_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.loaithietbi_idloai_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.loaithietbi_idloai_seq OWNER TO postgres;

--
-- Name: loaithietbi_idloai_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.loaithietbi_idloai_seq OWNED BY public.loaithietbi.idloai;


--
-- Name: nguoidung; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nguoidung (
    idnguoidung integer NOT NULL,
    iddonvi integer,
    taikhooan character varying(25) NOT NULL,
    matkhau character varying(50) NOT NULL,
    tennguoidung character varying(20) NOT NULL,
    quyen character varying(20) NOT NULL
);


ALTER TABLE public.nguoidung OWNER TO postgres;

--
-- Name: nguoidung_idnguoidung_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nguoidung_idnguoidung_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nguoidung_idnguoidung_seq OWNER TO postgres;

--
-- Name: nguoidung_idnguoidung_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nguoidung_idnguoidung_seq OWNED BY public.nguoidung.idnguoidung;


--
-- Name: thietbi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.thietbi (
    idthietbi integer NOT NULL,
    idloai integer NOT NULL,
    iddonvi integer,
    tenthietbi character varying(50) NOT NULL,
    taikhoan character varying(30) NOT NULL,
    matkhau character varying(50) NOT NULL,
    trangthai boolean NOT NULL
);


ALTER TABLE public.thietbi OWNER TO postgres;

--
-- Name: thietbi_idthietbi_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.thietbi_idthietbi_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.thietbi_idthietbi_seq OWNER TO postgres;

--
-- Name: thietbi_idthietbi_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.thietbi_idthietbi_seq OWNED BY public.thietbi.idthietbi;


--
-- Name: donvi iddonvi; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.donvi ALTER COLUMN iddonvi SET DEFAULT nextval('public.donvi_iddonvi_seq'::regclass);


--
-- Name: dulieu iddulieu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dulieu ALTER COLUMN iddulieu SET DEFAULT nextval('public.dulieu_iddulieu_seq'::regclass);


--
-- Name: lichsu idlichsu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lichsu ALTER COLUMN idlichsu SET DEFAULT nextval('public.lichsu_idlichsu_seq'::regclass);


--
-- Name: loaithietbi idloai; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loaithietbi ALTER COLUMN idloai SET DEFAULT nextval('public.loaithietbi_idloai_seq'::regclass);


--
-- Name: nguoidung idnguoidung; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nguoidung ALTER COLUMN idnguoidung SET DEFAULT nextval('public.nguoidung_idnguoidung_seq'::regclass);


--
-- Name: thietbi idthietbi; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thietbi ALTER COLUMN idthietbi SET DEFAULT nextval('public.thietbi_idthietbi_seq'::regclass);


--
-- Data for Name: donvi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.donvi (iddonvi, tendonvi) FROM stdin;
1	tpHCM\n
2	Cần Thơ
3	Vĩnh Long\n
\.


--
-- Data for Name: dulieu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dulieu (iddulieu, idthietbi, thoigiangui, chitiet) FROM stdin;
2	2	2021-07-23	37
1	1	2021-01-02	đã gửi
3	3	2021-07-22	1000
\.


--
-- Data for Name: lichsu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lichsu (idlichsu, idnguoidung, idthietbi, thoigiantt, thaotac) FROM stdin;
1	3	1	2021-07-01	thêm
2	1	3	2021-02-01	sửa
3	2	2	2021-06-07	thêm
\.


--
-- Data for Name: loaithietbi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.loaithietbi (idloai, tenloai, mota) FROM stdin;
1	đo nhiệt độ	đo nhiệt độ
2	đo lượng mưa	đo lượng mưa
3	máy tính	máy tính1
\.


--
-- Data for Name: nguoidung; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nguoidung (idnguoidung, iddonvi, taikhooan, matkhau, tennguoidung, quyen) FROM stdin;
1	3	thuan	c1921ad3b7cc07f38a81334814a99657	Hòa Thuận	admin\n
2	2	vinh	4107eaebd361f3477b630f4ed7452418	Thế Vinh	admin\n
3	1	thang	6e0c130ca8cf53a2473bd88044b83da9	Quang Thắng	nv
\.


--
-- Data for Name: thietbi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.thietbi (idthietbi, idloai, iddonvi, tenthietbi, taikhoan, matkhau, trangthai) FROM stdin;
1	3	1	laptopdell	laptop	312f91285e048e09bb4aefef23627994	t
2	1	2	nhiệt độ1	nhietdo	4c2bc155a4b790aa9070080633b02855	f
3	2	3	lượng mưa1	luongmua	a5a184f2e93bbd8700f49c5913955496	t
\.


--
-- Name: donvi_iddonvi_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.donvi_iddonvi_seq', 1, true);


--
-- Name: dulieu_iddulieu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dulieu_iddulieu_seq', 1, false);


--
-- Name: lichsu_idlichsu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lichsu_idlichsu_seq', 1, false);


--
-- Name: loaithietbi_idloai_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.loaithietbi_idloai_seq', 3, true);


--
-- Name: nguoidung_idnguoidung_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nguoidung_idnguoidung_seq', 1, false);


--
-- Name: thietbi_idthietbi_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.thietbi_idthietbi_seq', 1, false);


--
-- Name: donvi pk_donvi; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.donvi
    ADD CONSTRAINT pk_donvi PRIMARY KEY (iddonvi);


--
-- Name: dulieu pk_dulieu; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dulieu
    ADD CONSTRAINT pk_dulieu PRIMARY KEY (iddulieu);


--
-- Name: lichsu pk_lichsu; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lichsu
    ADD CONSTRAINT pk_lichsu PRIMARY KEY (idlichsu);


--
-- Name: loaithietbi pk_loaithietbi; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loaithietbi
    ADD CONSTRAINT pk_loaithietbi PRIMARY KEY (idloai);


--
-- Name: nguoidung pk_nguoidung; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nguoidung
    ADD CONSTRAINT pk_nguoidung PRIMARY KEY (idnguoidung);


--
-- Name: thietbi pk_thietbi; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thietbi
    ADD CONSTRAINT pk_thietbi PRIMARY KEY (idthietbi);


--
-- Name: donvi_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX donvi_pk ON public.donvi USING btree (iddonvi);


--
-- Name: dulieu_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX dulieu_pk ON public.dulieu USING btree (iddulieu);


--
-- Name: lichsu_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX lichsu_pk ON public.lichsu USING btree (idlichsu);


--
-- Name: loaithietbi_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX loaithietbi_pk ON public.loaithietbi USING btree (idloai);


--
-- Name: nguoidung_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX nguoidung_pk ON public.nguoidung USING btree (idnguoidung);


--
-- Name: relationship_1_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX relationship_1_fk ON public.thietbi USING btree (idloai);


--
-- Name: relationship_2_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX relationship_2_fk ON public.lichsu USING btree (idnguoidung);


--
-- Name: relationship_3_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX relationship_3_fk ON public.lichsu USING btree (idthietbi);


--
-- Name: relationship_4_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX relationship_4_fk ON public.dulieu USING btree (idthietbi);


--
-- Name: relationship_5_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX relationship_5_fk ON public.nguoidung USING btree (iddonvi);


--
-- Name: relationship_6_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX relationship_6_fk ON public.thietbi USING btree (iddonvi);


--
-- Name: thietbi_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX thietbi_pk ON public.thietbi USING btree (idthietbi);


--
-- Name: dulieu fk_dulieu_relations_thietbi; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dulieu
    ADD CONSTRAINT fk_dulieu_relations_thietbi FOREIGN KEY (idthietbi) REFERENCES public.thietbi(idthietbi) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: lichsu fk_lichsu_relations_nguoidun; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lichsu
    ADD CONSTRAINT fk_lichsu_relations_nguoidun FOREIGN KEY (idnguoidung) REFERENCES public.nguoidung(idnguoidung) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: lichsu fk_lichsu_relations_thietbi; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lichsu
    ADD CONSTRAINT fk_lichsu_relations_thietbi FOREIGN KEY (idthietbi) REFERENCES public.thietbi(idthietbi) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: nguoidung fk_nguoidun_relations_donvi; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nguoidung
    ADD CONSTRAINT fk_nguoidun_relations_donvi FOREIGN KEY (iddonvi) REFERENCES public.donvi(iddonvi) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: thietbi fk_thietbi_relations_donvi; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thietbi
    ADD CONSTRAINT fk_thietbi_relations_donvi FOREIGN KEY (iddonvi) REFERENCES public.donvi(iddonvi) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: thietbi fk_thietbi_relations_loaithie; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thietbi
    ADD CONSTRAINT fk_thietbi_relations_loaithie FOREIGN KEY (idloai) REFERENCES public.loaithietbi(idloai) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--
>>>>>>> 34dbda849e4c52bee1f7e632e1d3ea79e22b7f74

INSERT INTO public.loaithietbi(tenloai, mota) VALUES ('Máy tính', null);
INSERT INTO public.loaithietbi(tenloai, mota) VALUES ('Nhiệt kế', null);
INSERT INTO public.loaithietbi(tenloai, mota) VALUES ('Đo lượng nước', null);

INSERT INTO public.thietbi(idloai, tenthietbi, taikhoan, matkhau, trangthai) VALUES (1, 'Dell', 'maytinh01', 'dc819a95e66913d46ca261c070519f3c', true);
INSERT INTO public.thietbi(idloai, tenthietbi, taikhoan, matkhau, trangthai) VALUES (1, 'Asus', 'maytinh02', 'dc819a95e66913d46ca261c070519f3c', true);
INSERT INTO public.thietbi(idloai, tenthietbi, taikhoan, matkhau, trangthai) VALUES (2, 'Amon', 'nhietke01', '3b5a7330cdf28e5919d2473ed7e292bf', true);
INSERT INTO public.thietbi(idloai, tenthietbi, taikhoan, matkhau, trangthai) VALUES (3, 'Leon', 'luongnuoc01', '7663097be6eb4eef78169c0279a5bebc', false);

INSERT INTO public.nguoidung(taikhooan, matkhau, tennguoidung, quyen) VALUES ('thevinh01', 'dfa2cf42e689dc76107c5d4c91d03007', 'Tần Thế Vinh', 'admin');
INSERT INTO public.nguoidung(taikhooan, matkhau, tennguoidung, quyen) VALUES ('hoathuan01', '0eda5e8fc717c2871c7786b0a048a74d', 'Phan Hòa Thuận', 'admin');
INSERT INTO public.nguoidung(taikhooan, matkhau, tennguoidung, quyen) VALUES ('quangthang01', '2909b73d05447fe510ecf365e7fb15eb', 'Lê Quang Thắng', 'admin');

INSERT INTO public.dulieu(idthietbi, thoigiangui, chitiet) VALUES (1, '2021-02-01 04:05:06', 'hello');
INSERT INTO public.dulieu(idthietbi, thoigiangui, chitiet) VALUES (2, '2021-02-01 04:05:06', 'hello');
INSERT INTO public.dulieu(idthietbi, thoigiangui, chitiet) VALUES (1, '2021-02-03 04:05:06', 'hi');

INSERT INTO public.lichsu(idnguoidung, idthietbi, thoigiantt, thaotac) VALUES (1, 1, '2021-02-02 04:05:06', 'Lệnh');
INSERT INTO public.lichsu(idnguoidung, idthietbi, thoigiantt, thaotac) VALUES (1, 2, '2021-01-03 04:05:06', 'Lệnh');