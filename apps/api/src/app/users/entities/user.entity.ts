import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Role } from '../dto/create-user.dto';
import { environment } from '@tazagroup/shared/environments';
@Entity('users', {database:environment.DB_TEST.database, orderBy: { Ngaytao: 'DESC' } })
export class UsersEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ nullable: true,default:'0'})
    ref_id: string;
    @Column()
    SDT: string;
    @Column({collation: "utf8_general_ci"})
    Code: string;
    @Column({collation: "utf8_general_ci"})
    Hoten: string;
    @Column({collation: "utf8_general_ci"})
    email: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    Diachi: string;
    @Column()
    password: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    Profile: string;
    @Column({type: 'enum', enum: Role, default: Role.User})
    Role: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    Phanquyen: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    Menu: string;
    @Column({collation: "utf8_general_ci",type:"simple-array"})
    fcmToken: string[];
    @Column({default:1})
    Sapxep:number
    @Column({default:true})
    Trangthai: boolean;
    @Column({default:0})
    Status: number;
    @Column({collation: "utf8_general_ci"})
    Ghichu: string;
    @Column({collation: "utf8_general_ci"})
    idTao: string;
    @CreateDateColumn()
    Ngaytao: Date;
 }
