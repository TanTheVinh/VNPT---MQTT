<<<<<<< HEAD
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
=======
/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     7/23/2021 11:19:07 AM                        */
/*==============================================================*/
>>>>>>> 8af9c7d14fd835f164c1cd37b664e47c435a7148


<<<<<<< HEAD
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
=======
drop index DONVI_PK;

drop table DONVI;
>>>>>>> 8af9c7d14fd835f164c1cd37b664e47c435a7148

drop index RELATIONSHIP_4_FK;

drop index DULIEU_PK;

drop table DULIEU;

drop index RELATIONSHIP_3_FK;

drop index RELATIONSHIP_2_FK;

drop index LICHSU_PK;

drop table LICHSU;

drop index LOAITHIETBI_PK;

drop table LOAITHIETBI;

<<<<<<< HEAD
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
=======
drop index RELATIONSHIP_5_FK;
>>>>>>> 8af9c7d14fd835f164c1cd37b664e47c435a7148

drop index NGUOIDUNG_PK;

drop table NGUOIDUNG;

drop index RELATIONSHIP_6_FK;

drop index RELATIONSHIP_1_FK;

drop index THIETBI_PK;

drop table THIETBI;

/*==============================================================*/
/* Table: DONVI                                                 */
/*==============================================================*/
create table DONVI (
   IDDONVI     SERIAL,
   TENDONVI             VARCHAR(30)          not null,
   constraint PK_DONVI primary key (IDDONVI)
);

/*==============================================================*/
/* Index: DONVI_PK                                              */
/*==============================================================*/
create unique index DONVI_PK on DONVI (
IDDONVI
);

/*==============================================================*/
/* Table: DULIEU                                                */
/*==============================================================*/
create table DULIEU (
   IDDULIEU  SERIAL,
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
   IDLICHSU   SERIAL,
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
   IDLOAI   SERIAL,
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
   IDNGUOIDUNG   SERIAL,
   IDDONVI              INT4                 null,
   TAIKHOAN            VARCHAR(25)          not null,
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
/* Index: RELATIONSHIP_5_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_5_FK on NGUOIDUNG (
IDDONVI
);

/*==============================================================*/
/* Table: THIETBI                                               */
/*==============================================================*/
create table THIETBI (
   IDTHIETBI     SERIAL,
   IDLOAI               INT4                 not null,
   IDDONVI              INT4                 null,
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

<<<<<<< HEAD
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
=======
/*==============================================================*/
/* Index: RELATIONSHIP_6_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_6_FK on THIETBI (
IDDONVI
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

alter table NGUOIDUNG
   add constraint FK_NGUOIDUN_RELATIONS_DONVI foreign key (IDDONVI)
      references DONVI (IDDONVI)
      on delete restrict on update restrict;

alter table THIETBI
   add constraint FK_THIETBI_RELATIONS_LOAITHIE foreign key (IDLOAI)
      references LOAITHIETBI (IDLOAI)
      on delete restrict on update restrict;

alter table THIETBI
   add constraint FK_THIETBI_RELATIONS_DONVI foreign key (IDDONVI)
      references DONVI (IDDONVI)
      on delete restrict on update restrict;


INSERT INTO public.loaithietbi(tenloai, mota) VALUES ('máy tính', 'máy tính');
INSERT INTO public.loaithietbi(tenloai, mota) VALUES ('lọc nước', 'lọc nước');
INSERT INTO public.loaithietbi(tenloai, mota) VALUES ('nhiệt kế', 'nhiệt kế');

INSERT INTO public.donvi(tendonvi) VALUES ('TP.HCM');
INSERT INTO public.donvi(tendonvi) VALUES ('Cần Thơ');
INSERT INTO public.donvi(tendonvi) VALUES ('Hậu Giang');
INSERT INTO public.donvi(tendonvi) VALUES ('Vĩnh Long');

INSERT INTO public.nguoidung(iddonvi, taikhoan, matkhau, tennguoidung, quyen) 
VALUES (1, 'thevinh01', 'dfa2cf42e689dc76107c5d4c91d03007', 'Tần Thế Vinh', 'admin');
INSERT INTO public.nguoidung(iddonvi, taikhoan, matkhau, tennguoidung, quyen) 
VALUES (2, 'thevinh02', 'dfa2cf42e689dc76107c5d4c91d03007', 'Tần Thế Vinh 2', 'admin');
INSERT INTO public.nguoidung(iddonvi, taikhoan, matkhau, tennguoidung, quyen) 
VALUES (3, 'thevinh03', 'dfa2cf42e689dc76107c5d4c91d03007', 'Tần Thế Vinh 3', 'admin');

INSERT INTO public.thietbi(idloai, iddonvi, tenthietbi, taikhoan, matkhau, trangthai)
VALUES (1, 3, 'máy tính 1', 'maytinh01', 'dc819a95e66913d46ca261c070519f3c', true);
INSERT INTO public.thietbi(idloai, iddonvi, tenthietbi, taikhoan, matkhau, trangthai)
VALUES (1, 2, 'máy tính 2', 'maytinh02', 'dc819a95e66913d46ca261c070519f3c', false);
INSERT INTO public.thietbi(idloai, iddonvi, tenthietbi, taikhoan, matkhau, trangthai)
VALUES (1, 1, 'máy tính 3', 'maytinh03', 'dc819a95e66913d46ca261c070519f3c', true);
INSERT INTO public.thietbi(idloai, iddonvi, tenthietbi, taikhoan, matkhau, trangthai)
VALUES (1, 1, 'máy tính 4', 'maytinh04', 'dc819a95e66913d46ca261c070519f3c', true);
INSERT INTO public.thietbi(idloai, iddonvi, tenthietbi, taikhoan, matkhau, trangthai)
VALUES (3, 1, 'nhiệt kế 1', 'nhietke01', '3b5a7330cdf28e5919d2473ed7e292bf', true);
INSERT INTO public.thietbi(idloai, iddonvi, tenthietbi, taikhoan, matkhau, trangthai)
VALUES (3, 4, 'nhiệt kế 2', 'nhietke02', '3b5a7330cdf28e5919d2473ed7e292bf', false);
INSERT INTO public.thietbi(idloai, iddonvi, tenthietbi, taikhoan, matkhau, trangthai)
VALUES (3, 3, 'nhiệt kế 3', 'nhietke03', '3b5a7330cdf28e5919d2473ed7e292bf', true);

INSERT INTO public.lichsu(idnguoidung, idthietbi, thoigiantt, thaotac)
VALUES (1, 3, '2021-07-08 06:04:06', 'đăng nhập');
INSERT INTO public.lichsu(idnguoidung, idthietbi, thoigiantt, thaotac)
VALUES (3, 1, '2021-08-08 06:04:06', 'gửi lệnh');
INSERT INTO public.lichsu(idnguoidung, idthietbi, thoigiantt, thaotac)
VALUES (2, 2, '2021-06-01 06:04:06', 'gửi lệnh');

INSERT INTO public.dulieu(idthietbi, thoigiangui, chitiet)
VALUES (3, '2021-09-09 04:05:06', 'test dữ liệu');
INSERT INTO public.dulieu(idthietbi, thoigiangui, chitiet)
VALUES (2, '2021-09-07 04:05:06', 'test dữ liệu');
INSERT INTO public.dulieu(idthietbi, thoigiangui, chitiet)
VALUES (4, '2021-09-09 04:05:06', 'test dữ liệu');
INSERT INTO public.dulieu(idthietbi, thoigiangui, chitiet)
VALUES (3, '2021-08-07 04:05:06', 'test dữ liệu');
INSERT INTO public.dulieu(idthietbi, thoigiangui, chitiet)
VALUES (5, '2021-07-09 04:05:06', 'test dữ liệu');
INSERT INTO public.dulieu(idthietbi, thoigiangui, chitiet)
VALUES (7, '2021-12-07 04:05:06', 'test dữ liệu');
>>>>>>> 8af9c7d14fd835f164c1cd37b664e47c435a7148
