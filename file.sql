/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     7/23/2021 11:19:07 AM                        */
/*==============================================================*/


drop index DONVI_PK;

drop table DONVI;

drop index RELATIONSHIP_4_FK;

drop index DULIEU_PK;

drop table DULIEU;

drop index RELATIONSHIP_3_FK;

drop index RELATIONSHIP_2_FK;

drop index LICHSU_PK;

drop table LICHSU;

drop index LOAITHIETBI_PK;

drop table LOAITHIETBI;

drop index RELATIONSHIP_5_FK;

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

INSERT INTO public.nguoidung(iddonvi, taikhooan, matkhau, tennguoidung, quyen) 
VALUES (1, 'thevinh01', 'dfa2cf42e689dc76107c5d4c91d03007', 'Tần Thế Vinh', 'admin');
INSERT INTO public.nguoidung(iddonvi, taikhooan, matkhau, tennguoidung, quyen) 
VALUES (2, 'thevinh02', 'dfa2cf42e689dc76107c5d4c91d03007', 'Tần Thế Vinh 2', 'admin');
INSERT INTO public.nguoidung(iddonvi, taikhooan, matkhau, tennguoidung, quyen) 
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