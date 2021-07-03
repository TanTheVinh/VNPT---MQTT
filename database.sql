/*==============================================================*/
/* DBMS name:      PostgreSQL 8                                 */
/* Created on:     7/3/2021 11:03:30 AM                         */
/*==============================================================*/


drop index RELATIONSHIP_2_FK;

drop table DULIEU;

drop index LICHSU2_FK;

drop index LICHSU_FK;

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
   MATHIETBI            INT4                 not null,
   THOIGIANGUI          DATE                 not null,
   CHITIET              TEXT                 not null
);

/*==============================================================*/
/* Index: RELATIONSHIP_2_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_2_FK on DULIEU (
MATHIETBI
);

/*==============================================================*/
/* Table: LICHSU                                                */
/*==============================================================*/
create table LICHSU (
   TAIKHOOAN            VARCHAR(15)          not null,
   MATHIETBI            INT4                 not null,
   THOIGIANTT           DATE                 not null,
   THAOTAC              VARCHAR(50)          null,
   constraint PK_LICHSU primary key (TAIKHOOAN, MATHIETBI)
);

/*==============================================================*/
/* Index: LICHSU_PK                                             */
/*==============================================================*/
create unique index LICHSU_PK on LICHSU (
TAIKHOOAN,
MATHIETBI
);

/*==============================================================*/
/* Index: LICHSU_FK                                             */
/*==============================================================*/
create  index LICHSU_FK on LICHSU (
TAIKHOOAN
);

/*==============================================================*/
/* Index: LICHSU2_FK                                            */
/*==============================================================*/
create  index LICHSU2_FK on LICHSU (
MATHIETBI
);

/*==============================================================*/
/* Table: LOAITHIETBI                                           */
/*==============================================================*/
create table LOAITHIETBI (
   MALOAI               INT4                 not null,
   TENLOAI              VARCHAR(50)          not null,
   MOTA                 TEXT                 null,
   constraint PK_LOAITHIETBI primary key (MALOAI)
);

/*==============================================================*/
/* Index: LOAITHIETBI_PK                                        */
/*==============================================================*/
create unique index LOAITHIETBI_PK on LOAITHIETBI (
MALOAI
);

/*==============================================================*/
/* Table: NGUOIDUNG                                             */
/*==============================================================*/
create table NGUOIDUNG (
   TAIKHOOAN            VARCHAR(15)          not null,
   MATKHAU              VARCHAR(20)          not null,
   TENNGUOIDUNG         VARCHAR(20)          not null,
   QUYEN                VARCHAR(20)          not null,
   constraint PK_NGUOIDUNG primary key (TAIKHOOAN)
);

/*==============================================================*/
/* Index: NGUOIDUNG_PK                                          */
/*==============================================================*/
create unique index NGUOIDUNG_PK on NGUOIDUNG (
TAIKHOOAN
);

/*==============================================================*/
/* Table: THIETBI                                               */
/*==============================================================*/
create table THIETBI (
   MATHIETBI            INT4                 not null,
   MALOAI               INT4                 not null,
   TENTHIETBI           VARCHAR(50)          not null,
   DIACHI               VARCHAR(30)          not null,
   TOADO                VARCHAR(30)          not null,
   TAIKHOAN             VARCHAR(30)          not null,
   MATKHAU              VARCHAR(20)          not null,
   constraint PK_THIETBI primary key (MATHIETBI)
);

/*==============================================================*/
/* Index: THIETBI_PK                                            */
/*==============================================================*/
create unique index THIETBI_PK on THIETBI (
MATHIETBI
);

/*==============================================================*/
/* Index: RELATIONSHIP_1_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_1_FK on THIETBI (
MALOAI
);

alter table DULIEU
   add constraint FK_DULIEU_RELATIONS_THIETBI foreign key (MATHIETBI)
      references THIETBI (MATHIETBI)
      on delete restrict on update restrict;

alter table LICHSU
   add constraint FK_LICHSU_LICHSU_NGUOIDUN foreign key (TAIKHOOAN)
      references NGUOIDUNG (TAIKHOOAN)
      on delete restrict on update restrict;

alter table LICHSU
   add constraint FK_LICHSU_LICHSU2_THIETBI foreign key (MATHIETBI)
      references THIETBI (MATHIETBI)
      on delete restrict on update restrict;

alter table THIETBI
   add constraint FK_THIETBI_RELATIONS_LOAITHIE foreign key (MALOAI)
      references LOAITHIETBI (MALOAI)
      on delete restrict on update restrict;

