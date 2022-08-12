import { Actor, AdminTaskManager, Member, Task } from '@graasp/sdk';

import { QueryFilters } from '../../constants';
import { AdminItemService } from './db-service';
import { GetAllTask } from './tasks/get-all-task';

export class AdminItemTaskManager {
  adminItemService: AdminItemService;
  adminTaskManager: AdminTaskManager;
  adminRoleId?: string;

  constructor(
    adminTaskManager: AdminTaskManager,
    adminItemService: AdminItemService,
    adminRoleId: string,
  ) {
    this.adminTaskManager = adminTaskManager;
    this.adminRoleId = adminRoleId;
    this.adminItemService = adminItemService;
  }

  createGetAllTaskSequence(member: Member, filters: QueryFilters): Task<Actor, unknown>[] {
    const t1 = this.adminTaskManager.createGetMemberRolesTask(member, {
      validateRoleId: this.adminRoleId,
    }) as Task<Actor, unknown>;
    const t2 = new GetAllTask(member, this.adminItemService, filters);
    return [t1, t2];
  }
}
