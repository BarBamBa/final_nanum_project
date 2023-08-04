-- users 테이블
drop table if exists users;
create table users (
                       id bigint not null auto_increment,
                       create_at datetime(6),
                       update_at datetime(6),
                       address varchar(255),
                       age integer not null,
                       email varchar(255) not null,
                       name varchar(255),
                       nickname varchar(255),
                       password varchar(255),
                       phone varchar(255),
                       primary key (id)
) engine=INNODB;
alter table if exists users
    add constraint UK_6dotkott2kjsp8vw4d0m25fb7 unique (email);

-- volunteer 테이블
drop table if exists volunteer;
create table volunteer (
                           id bigint not null auto_increment,
                           a_flg char(1) not null,
                           category varchar(255),
                           city_code integer not null,
                           district_code integer not null,
                           end_date datetime(6),
                           end_time datetime(6),
                           location varchar(255),
                           org varchar(255),
                           r_capacity integer not null,
                           r_end_date datetime(6),
                           r_start_date datetime(6),
                           r_status char(1) not null,
                           start_date datetime(6),
                           start_time datetime(6),
                           t_flg char(1) not null,
                           title varchar(255),
                           primary key (id)
) engine=INNODB;

-- applicants 테이블
drop table if exists applicants;
create table applicants (
                            id bigint not null auto_increment,
                            create_at datetime(6),
                            update_at datetime(6),
                            status char(1) not null,
                            u_id bigint,
                            v_id bigint,
                            primary key (id)
) engine=INNODB;
alter table if exists applicants
    add constraint FKj4w8gbter324wnkg4lpfw9ps
    foreign key (u_id)
    references users (id);

alter table if exists applicants
    add constraint FKmvg8oq2771hbsrs439bkeobf0
    foreign key (v_id)
    references volunteer (id);



-- board 테이블
drop table if exists board;
create table board (
                       id bigint not null auto_increment,
                       create_at datetime(6),
                       update_at datetime(6),
                       content varchar(255),
                       status char(1) not null,
                       title varchar(255),
                       u_id bigint,
                       primary key (id)
) engine=INNODB;
alter table if exists board
    add constraint FK6sxi9s1o6ajuu8winwrfutfq5
    foreign key (u_id)
    references users (id);

-- manager 테이블
drop table if exists manager;
create table manager (
                         id bigint not null auto_increment,
                         name varchar(255),
                         nickname varchar(255),
                         password varchar(255),
                         primary key (id)
) engine=INNODB;

-- notice 테이블
drop table if exists notice;
create table notice (
                        id bigint not null auto_increment,
                        create_at datetime(6),
                        update_at datetime(6),
                        sid bigint,
                        content varchar(255),
                        status char(1) not null,
                        title varchar(255),
                        primary key (id)
) engine=INNODB;

-- qna 테이블
drop table if exists qna;
create table qna (
                     id bigint not null auto_increment,
                     create_at datetime(6),
                     update_at datetime(6),
                     scontent varchar(255),
                     sid bigint,
                     stitle varchar(255),
                     ucontent varchar(255),
                     uid bigint,
                     utitle varchar(255),
                     primary key (id)
) engine=INNODB;

-- reply 테이블
drop table if exists reply;
create table reply (
                       id bigint not null auto_increment,
                       create_at datetime(6),
                       update_at datetime(6),
                       content varchar(255),
                       reply bigint,
                       b_id bigint,
                       u_id bigint,
                       primary key (id)
) engine=INNODB;
alter table if exists reply
    add constraint FK98uryntifyrkjymy7ri77bfvx
    foreign key (b_id)
    references board (id);

alter table if exists reply
    add constraint FKgt4xhruaopugu77kla332vqfp
    foreign key (u_id)
    references users (id);


-- review 테이블
drop table if exists review;
create table review (
                        id bigint not null auto_increment,
                        create_at datetime(6),
                        update_at datetime(6),
                        vtitle varchar(255),
                        content varchar(255),
                        status char(1) not null,
                        title varchar(255),
                        u_id bigint,
                        v_id bigint,
                        primary key (id)
) engine=INNODB;
alter table if exists review
    add constraint FKmj6sk77uhjp0a5jjfodgesunq
    foreign key (u_id)
    references users (id);

alter table if exists review
    add constraint FK2q51bcfg5xb9r0suyi09gl1av
    foreign key (v_id)
    references volunteer (id);