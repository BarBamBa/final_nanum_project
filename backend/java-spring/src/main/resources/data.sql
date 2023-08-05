INSERT INTO users (`email`,`age`, `create_at`, `update_at`, `address`, `name`, `nickname`, `password`, `phone`) values ("abc@gamil.com", 31, now(), now(), "addresstest", "testname", "testnick", "1234", "123-1234-1234" );
INSERT INTO users (`email`,`age`, `create_at`, `update_at`, `address`, `name`, `nickname`, `password`, `phone`) values ("abc2@gamil.com", 32, now(), now(), "addresstest2", "testname2", "testnick2", "1234", "123-1234-1235" );

INSERT INTO board (`u_id`,`content`, `status`, `title`, `board_flg` ,`create_at`, `update_at`) values (1, "test content1", "Y", "test title1", 1, now(), now());
INSERT INTO board (`u_id`,`content`, `status`, `title`, `board_flg` ,`create_at`, `update_at`) values (2, "test content2", "Y", "test title2", 1, now(), now());
