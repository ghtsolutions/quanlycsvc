import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { environment } from '@tazagroup/shared/environments';
@Entity('thietbi', {database:environment.DB_TEST.database, orderBy: { Ngaytao: 'DESC' } })
export class Thietbi {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci',default:''})
    Tieude: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Hinhanh: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Mota: string;
    @Column({ default: 1 })
    Ordering: number;
    @Column({ default: 0 })
    Tinhtrang: number;
    @Column({ default: 0 })
    Trangthai: number;
    @Column({ default: 0 })
    HSD: number;
    @CreateDateColumn()
    Ngaytao: Date;
    @Column({ nullable: true })
    idTao: string;
}
