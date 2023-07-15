@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot(
        type: 'mysql',
        host: '103.221.222.71',
        port: 3306,
        username: 'tazaspac_chikiet',
        password: '@Hikiet88',
        database: 'tazaspac_nodejs',
        autoLoadEntities: true,
        synchronize: true,
        charset: "utf8mb4",
        collation: "utf8mb4_unicode_ci"
      ),
    SharedApiModule,
    Hdermav2ApiModule,
    LibhrmApiModule,
    TimonaApiModule,
    UploadModule,
    CrmtimonaApiModule,
    LibwheelApiModule,
    LichsuModule,
    AuthModule,
    UsersModule,
    ThietbiModule,
    DaotaoModule,
    TazagroupModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
