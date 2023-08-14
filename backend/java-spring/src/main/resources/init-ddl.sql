create table applicants (
    id bigint not null auto_increment,
    create_at datetime(6),
    update_at datetime(6),
    status char(1) not null,
    user_id bigint,
    volunteer_id bigint,
    primary key (id)
) engine=InnoDB;
 

create table board (
   board_id bigint not null auto_increment,
   create_at datetime(6),
   update_at datetime(6),
   content TEXT,
   flg char(1) not null,
   status char(1) not null,
   title varchar(255),
   user_id bigint,
   primary key (board_id)
) engine=InnoDB;
 

create table manager (
     manager_id bigint not null auto_increment,
     name varchar(255),
     nickname varchar(255),
     password varchar(255),
     primary key (manager_id)
) engine=InnoDB;
 

create table notice (
    id bigint not null auto_increment,
    create_at datetime(6),
    update_at datetime(6),
    content TEXT,
    status char(1) not null,
    title varchar(255),
    manager_id bigint,
    primary key (id)
) engine=InnoDB;
 

create table qna (
    id bigint not null auto_increment,
    create_at datetime(6),
    update_at datetime(6),
    mcontent TEXT,
    mtitle varchar(255),
    ucontent TEXT,
    utitle varchar(255),
    manager_id bigint,
    user_id bigint,
    primary key (id)
) engine=InnoDB;
 

create table reply (
    reply_id bigint not null auto_increment,
    create_at datetime(6),
    update_at datetime(6),
    content TEXT,
    reply bigint,
    status char(1) not null,
    board_id bigint,
    user_id bigint,
    primary key (reply_id)
) engine=InnoDB;
 

create table review (
    id bigint not null auto_increment,
    create_at datetime(6),
    update_at datetime(6),
    content TEXT,
    status char(1) not null,
    title varchar(255),
    user_id bigint,
    volunteer_id bigint,
    primary key (id)
) engine=InnoDB;
 

create table users (
    user_id bigint not null auto_increment,
    create_at datetime(6),
    update_at datetime(6),
    address varchar(255),
    age integer not null,
    email varchar(255) not null,
    name varchar(255),
    nickname varchar(255),
    password varchar(255),
    phone varchar(255),
    status char(1),
    primary key (user_id)
) engine=InnoDB;

alter table if exists users
    add constraint users_email_uk unique (email);
 

create table volunteer (
    volunteer_id bigint not null auto_increment,
    a_flg char(1) not null,
    category varchar(255),
    city_code integer not null,
    district_code integer not null,
    end_date datetime(6),
    end_time datetime(6),
    location varchar(255),
    number integer not null,
    org varchar(255),
    r_capacity integer not null,
    r_end_date datetime(6),
    r_start_date datetime(6),
    r_status char(1) not null,
    start_date datetime(6),
    start_time datetime(6),
    t_flg char(1) not null,
    title varchar(255),
    primary key (volunteer_id)
) engine=InnoDB;


alter table if exists applicants
    add constraint applicants_user_id_user_user_id
    foreign key (user_id)
    references users (user_id);
     

alter table if exists applicants
    add constraint applicants_volunteer_id_volunteer_volunteer_id
    foreign key (volunteer_id)
    references volunteer (volunteer_id);
     

alter table if exists board
    add constraint board_user_id_user_user_id
    foreign key (user_id)
    references users (user_id);
     

alter table if exists notice
    add constraint notice_manager_id_manager_manager_id
    foreign key (manager_id)
    references manager (manager_id);
     

alter table if exists qna
    add constraint qna_manager_id_manager_manager_id
    foreign key (manager_id)
    references manager (manager_id);
     

alter table if exists qna
    add constraint qna_user_id_user_user_id
    foreign key (user_id)
    references users (user_id);
     

alter table if exists reply
    add constraint reply_board_id_board_board_id
    foreign key (board_id)
    references board (board_id);
     

alter table if exists reply
    add constraint reply_user_id_user_user_id
    foreign key (user_id)
    references users (user_id);
     

alter table if exists review
    add constraint review_user_id_user_user_id
    foreign key (user_id)
    references users (user_id);
     

alter table if exists review
    add constraint review_volunteer_id_volunteer_volunteer_id
    foreign key (volunteer_id)
    references volunteer (volunteer_id);