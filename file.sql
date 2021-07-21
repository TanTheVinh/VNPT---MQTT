/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     7/19/2021 11:36:28 AM                        */
/*==============================================================*/


drop index RELATIONSHIP_4_FK;

drop index DULIEU_PK;

drop table DULIEU;

drop index RELATIONSHIP_3_FK;

drop index RELATIONSHIP_2_FK;

drop index LICHSU_PK;

drop table LICHSU;

drop index LOAITHIETBI_PK;

drop table LOAITHIETBI;

drop index NGUOIDUNG_PK;

drop table NGUOIDUNG;

drop index RELATIONSHIP_1_FK;

drop index THIETBI_PK;

drop table THIETBI;

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

INSERT INTO public.loaithietbi(tenloai, mota) VALUES ('Máy tính', null);
INSERT INTO public.loaithietbi(tenloai, mota) VALUES ('Nhiệt kế', null);
INSERT INTO public.loaithietbi(tenloai, mota) VALUES ('Đo lượng nước', null);

INSERT INTO public.thietbi(idloai, tenthietbi, taikhoan, matkhau, trangthai) VALUES (1, 'Dell', 'maytinh01', 'dc819a95e66913d46ca261c070519f3c', true);
INSERT INTO public.thietbi(idloai, tenthietbi, taikhoan, matkhau, trangthai) VALUES (1, 'Asus', 'maytinh02', 'dc819a95e66913d46ca261c070519f3c', true);
INSERT INTO public.thietbi(idloai, tenthietbi, taikhoan, matkhau, trangthai) VALUES (2, 'Amon', 'nhietke01', '3b5a7330cdf28e5919d2473ed7e292bf', true);
INSERT INTO public.thietbi(idloai, tenthietbi, taikhoan, matkhau, trangthai) VALUES (3, 'Leon', 'luongnuoc01', '7663097be6eb4eef78169c0279a5bebc', false);

INSERT INTO public.nguoidung(taikhoan, matkhau, tennguoidung, quyen) VALUES ('thevinh01', 'dfa2cf42e689dc76107c5d4c91d03007', 'Tần Thế Vinh', 'admin');
INSERT INTO public.nguoidung(taikhoan, matkhau, tennguoidung, quyen) VALUES ('hoathuan01', '0eda5e8fc717c2871c7786b0a048a74d', 'Phan Hòa Thuận', 'admin');
INSERT INTO public.nguoidung(taikhoan, matkhau, tennguoidung, quyen) VALUES ('quangthang01', '2909b73d05447fe510ecf365e7fb15eb', 'Lê Quang Thắng', 'admin');

INSERT INTO public.dulieu(idthietbi, thoigiangui, chitiet) VALUES (1, '2021-02-01 04:05:06', 'hello');
INSERT INTO public.dulieu(idthietbi, thoigiangui, chitiet) VALUES (2, '2021-02-01 04:05:06', 'hello');
INSERT INTO public.dulieu(idthietbi, thoigiangui, chitiet) VALUES (1, '2021-02-03 04:05:06', 'hi');

INSERT INTO public.lichsu(idnguoidung, idthietbi, thoigiantt, thaotac) VALUES (1, 1, '2021-02-02 04:05:06', 'Lệnh');
INSERT INTO public.lichsu(idnguoidung, idthietbi, thoigiantt, thaotac) VALUES (1, 2, '2021-01-03 04:05:06', 'Lệnh');