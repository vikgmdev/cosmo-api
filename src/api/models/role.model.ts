import mongoose from 'mongoose';
import { PermissionModel } from './permission.model';

export interface RoleModel extends mongoose.Document {
  title: string;
  permissions: PermissionModel[];
  isCoreRole: boolean;
  isDefaultRole: boolean;
}

const roleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permission',
    },
  ],
  isCoreRole: {
    type: Boolean,
    default: false,
  },
  isDefaultRole: {
    type: Boolean,
    default: false,
  },
});

export const Role = mongoose.model<RoleModel>('Role', roleSchema);
