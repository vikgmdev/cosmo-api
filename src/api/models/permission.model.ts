import mongoose from 'mongoose';

export interface PermissionModel extends mongoose.Document {
  title: string;
  name: string;
  level: number;
  parent: PermissionModel;
  childrens: PermissionModel[];
}

const permissionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permission',
    },
    childrens: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission',
      },
    ],
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
);

export const Permission = mongoose.model<PermissionModel>('Permission', permissionSchema);
