import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { environment } from '@tazagroup/shared/environments';
@Entity('lichsu', {database:environment.DB_TEST.database, orderBy: { Ngaytao: 'DESC' } })
export class LichsuEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    idUser: string;
    @Column({ type: 'text', collation: 'utf8_general_ci'})
    idTB: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Ghichu: string;
    @Column({ default: 1 })
    Type: number;
    @Column({ default: 1 })
    Ordering: number;
    @Column({ default: 0 })
    Trangthai: number;
    @CreateDateColumn()
    Ngaytao: Date;
    @Column({ nullable: true })
    idTao: string;
}
