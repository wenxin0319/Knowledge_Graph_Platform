<template>
  <div :id="id" :class="className" style="width: 800px; height: 800px">
    <!-- <el-button
      style="position: absolute; top: 20px; margin-left: 40px"
      type="primary"
      @click="handleAddRole"
      >New Node</el-button
    > -->
    <el-table :data="rolesList" style="width: 100%; margin-top: 80px" border>
      <el-table-column align="center" label="Node Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType === 'edit' ? 'Edit Role' : 'New Role'"
    >
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="role.name" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label="Desc">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Role Description"
          />
        </el-form-item>
        <el-form-item label="Menus">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align: right">
        <el-button type="danger" @click="dialogVisible = false"
          >Cancel</el-button
        >
        <el-button type="primary" @click="confirmRole">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from "path";
import { deepClone } from "@/utils";
import {
  getRoutes,
  getRoles,
  addRole,
  deleteRole,
  updateRole,
} from "@/api/role";

const defaultRole = {
  key: "",
  name: "",
  description: "",
  routes: [],
};

export default {
  props: {
    className: {
      type: String,
      default: "NodePermission",
    },
    id: {
      type: String,
      default: "NodePermission",
    },
    width: {
      type: String,
      default: "200px",
    },
    height: {
      type: String,
      default: "200px",
    },
  },
  data() {
    return {
      res: [
        {
    code: 20000,
    data: [
        {
            key: "admin",
            name: "admin",
            description: "Super Administrator. Have access to view all pages.",
            routes: [
                {
                    "path": "/redirect",
                    "component": "layout/Layout",
                    "hidden": true,
                    "children": [
                        {
                            "path": "/redirect/:path*",
                            "component": "views/redirect/index"
                        }
                    ]
                },
                {
                    "path": "/login",
                    "component": "views/login/index",
                    "hidden": true
                },
                {
                    "path": "/auth-redirect",
                    "component": "views/login/auth-redirect",
                    "hidden": true
                },
                {
                    "path": "/404",
                    "component": "views/error-page/404",
                    "hidden": true
                },
                {
                    "path": "/401",
                    "component": "views/error-page/401",
                    "hidden": true
                },
                {
                    "path": "",
                    "component": "layout/Layout",
                    "redirect": "dashboard",
                    "children": [
                        {
                            "path": "dashboard",
                            "component": "views/dashboard/index",
                            "name": "Dashboard",
                            "meta": {
                                "title": "Dashboard",
                                "icon": "dashboard",
                                "affix": true
                            }
                        }
                    ]
                },
                {
                    "path": "/documentation",
                    "component": "layout/Layout",
                    "children": [
                        {
                            "path": "index",
                            "component": "views/documentation/index",
                            "name": "Documentation",
                            "meta": {
                                "title": "Documentation",
                                "icon": "documentation",
                                "affix": true
                            }
                        }
                    ]
                },
                {
                    "path": "/guide",
                    "component": "layout/Layout",
                    "redirect": "/guide/index",
                    "children": [
                        {
                            "path": "index",
                            "component": "views/guide/index",
                            "name": "Guide",
                            "meta": {
                                "title": "Guide",
                                "icon": "guide",
                                "noCache": true
                            }
                        }
                    ]
                },
                {
                    "path": "/permission",
                    "component": "layout/Layout",
                    "redirect": "/permission/index",
                    "alwaysShow": true,
                    "meta": {
                        "title": "Permission",
                        "icon": "lock",
                        "roles": [
                            "admin",
                            "editor"
                        ]
                    },
                    "children": [
                        {
                            "path": "page",
                            "component": "views/permission/page",
                            "name": "PagePermission",
                            "meta": {
                                "title": "Page Permission",
                                "roles": [
                                    "admin"
                                ]
                            }
                        },
                        {
                            "path": "directive",
                            "component": "views/permission/directive",
                            "name": "DirectivePermission",
                            "meta": {
                                "title": "Directive Permission"
                            }
                        },
                        {
                            "path": "role",
                            "component": "views/permission/role",
                            "name": "RolePermission",
                            "meta": {
                                "title": "Role Permission",
                                "roles": [
                                    "admin"
                                ]
                            }
                        }
                    ]
                },
                {
                    "path": "/icon",
                    "component": "layout/Layout",
                    "children": [
                        {
                            "path": "index",
                            "component": "views/icons/index",
                            "name": "Icons",
                            "meta": {
                                "title": "Icons",
                                "icon": "icon",
                                "noCache": true
                            }
                        }
                    ]
                },
                {
                    "path": "/components",
                    "component": "layout/Layout",
                    "redirect": "noRedirect",
                    "name": "ComponentDemo",
                    "meta": {
                        "title": "Components",
                        "icon": "component"
                    },
                    "children": [
                        {
                            "path": "tinymce",
                            "component": "views/components-demo/tinymce",
                            "name": "TinymceDemo",
                            "meta": {
                                "title": "Tinymce"
                            }
                        },
                        {
                            "path": "markdown",
                            "component": "views/components-demo/markdown",
                            "name": "MarkdownDemo",
                            "meta": {
                                "title": "Markdown"
                            }
                        },
                        {
                            "path": "json-editor",
                            "component": "views/components-demo/json-editor",
                            "name": "JsonEditorDemo",
                            "meta": {
                                "title": "Json Editor"
                            }
                        },
                        {
                            "path": "split-pane",
                            "component": "views/components-demo/split-pane",
                            "name": "SplitpaneDemo",
                            "meta": {
                                "title": "SplitPane"
                            }
                        },
                        {
                            "path": "avatar-upload",
                            "component": "views/components-demo/avatar-upload",
                            "name": "AvatarUploadDemo",
                            "meta": {
                                "title": "Avatar Upload"
                            }
                        },
                        {
                            "path": "dropzone",
                            "component": "views/components-demo/dropzone",
                            "name": "DropzoneDemo",
                            "meta": {
                                "title": "Dropzone"
                            }
                        },
                        {
                            "path": "sticky",
                            "component": "views/components-demo/sticky",
                            "name": "StickyDemo",
                            "meta": {
                                "title": "Sticky"
                            }
                        },
                        {
                            "path": "count-to",
                            "component": "views/components-demo/count-to",
                            "name": "CountToDemo",
                            "meta": {
                                "title": "Count To"
                            }
                        },
                        {
                            "path": "mixin",
                            "component": "views/components-demo/mixin",
                            "name": "ComponentMixinDemo",
                            "meta": {
                                "title": "componentMixin"
                            }
                        },
                        {
                            "path": "back-to-top",
                            "component": "views/components-demo/back-to-top",
                            "name": "BackToTopDemo",
                            "meta": {
                                "title": "Back To Top"
                            }
                        },
                        {
                            "path": "drag-dialog",
                            "component": "views/components-demo/drag-dialog",
                            "name": "DragDialogDemo",
                            "meta": {
                                "title": "Drag Dialog"
                            }
                        },
                        {
                            "path": "drag-select",
                            "component": "views/components-demo/drag-select",
                            "name": "DragSelectDemo",
                            "meta": {
                                "title": "Drag Select"
                            }
                        },
                        {
                            "path": "dnd-list",
                            "component": "views/components-demo/dnd-list",
                            "name": "DndListDemo",
                            "meta": {
                                "title": "Dnd List"
                            }
                        },
                        {
                            "path": "drag-kanban",
                            "component": "views/components-demo/drag-kanban",
                            "name": "DragKanbanDemo",
                            "meta": {
                                "title": "Drag Kanban"
                            }
                        }
                    ]
                },
                {
                    "path": "/charts",
                    "component": "layout/Layout",
                    "redirect": "noRedirect",
                    "name": "Charts",
                    "meta": {
                        "title": "Charts",
                        "icon": "chart"
                    },
                    "children": [
                        {
                            "path": "keyboard",
                            "component": "views/charts/keyboard",
                            "name": "KeyboardChart",
                            "meta": {
                                "title": "Keyboard Chart",
                                "noCache": true
                            }
                        },
                        {
                            "path": "line",
                            "component": "views/charts/line",
                            "name": "LineChart",
                            "meta": {
                                "title": "Line Chart",
                                "noCache": true
                            }
                        },
                        {
                            "path": "mixchart",
                            "component": "views/charts/mixChart",
                            "name": "MixChart",
                            "meta": {
                                "title": "Mix Chart",
                                "noCache": true
                            }
                        }
                    ]
                },
                {
                    "path": "/nested",
                    "component": "layout/Layout",
                    "redirect": "/nested/menu1/menu1-1",
                    "name": "Nested",
                    "meta": {
                        "title": "Nested",
                        "icon": "nested"
                    },
                    "children": [
                        {
                            "path": "menu1",
                            "component": "views/nested/menu1/index",
                            "name": "Menu1",
                            "meta": {
                                "title": "Menu1"
                            },
                            "redirect": "/nested/menu1/menu1-1",
                            "children": [
                                {
                                    "path": "menu1-1",
                                    "component": "views/nested/menu1/menu1-1",
                                    "name": "Menu1-1",
                                    "meta": {
                                        "title": "Menu1-1"
                                    }
                                },
                                {
                                    "path": "menu1-2",
                                    "component": "views/nested/menu1/menu1-2",
                                    "name": "Menu1-2",
                                    "redirect": "/nested/menu1/menu1-2/menu1-2-1",
                                    "meta": {
                                        "title": "Menu1-2"
                                    },
                                    "children": [
                                        {
                                            "path": "menu1-2-1",
                                            "component": "views/nested/menu1/menu1-2/menu1-2-1",
                                            "name": "Menu1-2-1",
                                            "meta": {
                                                "title": "Menu1-2-1"
                                            }
                                        },
                                        {
                                            "path": "menu1-2-2",
                                            "component": "views/nested/menu1/menu1-2/menu1-2-2",
                                            "name": "Menu1-2-2",
                                            "meta": {
                                                "title": "Menu1-2-2"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "path": "menu1-3",
                                    "component": "views/nested/menu1/menu1-3",
                                    "name": "Menu1-3",
                                    "meta": {
                                        "title": "Menu1-3"
                                    }
                                }
                            ]
                        },
                        {
                            "path": "menu2",
                            "name": "Menu2",
                            "component": "views/nested/menu2/index",
                            "meta": {
                                "title": "Menu2"
                            }
                        }
                    ]
                },
                {
                    "path": "/example",
                    "component": "layout/Layout",
                    "redirect": "/example/list",
                    "name": "Example",
                    "meta": {
                        "title": "Example",
                        "icon": "example"
                    },
                    "children": [
                        {
                            "path": "create",
                            "component": "views/example/create",
                            "name": "CreateArticle",
                            "meta": {
                                "title": "Create Article",
                                "icon": "edit"
                            }
                        },
                        {
                            "path": "edit/:id(\\d+)",
                            "component": "views/example/edit",
                            "name": "EditArticle",
                            "meta": {
                                "title": "Edit Article",
                                "noCache": true
                            },
                            "hidden": true
                        },
                        {
                            "path": "list",
                            "component": "views/example/list",
                            "name": "ArticleList",
                            "meta": {
                                "title": "Article List",
                                "icon": "list"
                            }
                        }
                    ]
                },
                {
                    "path": "/tab",
                    "component": "layout/Layout",
                    "children": [
                        {
                            "path": "index",
                            "component": "views/tab/index",
                            "name": "Tab",
                            "meta": {
                                "title": "Tab",
                                "icon": "tab"
                            }
                        }
                    ]
                },
                {
                    "path": "/error",
                    "component": "layout/Layout",
                    "redirect": "noRedirect",
                    "name": "ErrorPages",
                    "meta": {
                        "title": "Error Pages",
                        "icon": "404"
                    },
                    "children": [
                        {
                            "path": "401",
                            "component": "views/error-page/401",
                            "name": "Page401",
                            "meta": {
                                "title": "Page 401",
                                "noCache": true
                            }
                        },
                        {
                            "path": "404",
                            "component": "views/error-page/404",
                            "name": "Page404",
                            "meta": {
                                "title": "Page 404",
                                "noCache": true
                            }
                        }
                    ]
                },
                {
                    "path": "/error-log",
                    "component": "layout/Layout",
                    "redirect": "noRedirect",
                    "children": [
                        {
                            "path": "log",
                            "component": "views/error-log/index",
                            "name": "ErrorLog",
                            "meta": {
                                "title": "Error Log",
                                "icon": "bug"
                            }
                        }
                    ]
                },
                {
                    "path": "/excel",
                    "component": "layout/Layout",
                    "redirect": "/excel/export-excel",
                    "name": "Excel",
                    "meta": {
                        "title": "Excel",
                        "icon": "excel"
                    },
                    "children": [
                        {
                            "path": "export-excel",
                            "component": "views/excel/export-excel",
                            "name": "ExportExcel",
                            "meta": {
                                "title": "Export Excel"
                            }
                        },
                        {
                            "path": "export-selected-excel",
                            "component": "views/excel/select-excel",
                            "name": "SelectExcel",
                            "meta": {
                                "title": "Select Excel"
                            }
                        },
                        {
                            "path": "export-merge-header",
                            "component": "views/excel/merge-header",
                            "name": "MergeHeader",
                            "meta": {
                                "title": "Merge Header"
                            }
                        },
                        {
                            "path": "upload-excel",
                            "component": "views/excel/upload-excel",
                            "name": "UploadExcel",
                            "meta": {
                                "title": "Upload Excel"
                            }
                        }
                    ]
                },
                {
                    "path": "/zip",
                    "component": "layout/Layout",
                    "redirect": "/zip/download",
                    "alwaysShow": true,
                    "meta": {
                        "title": "Zip",
                        "icon": "zip"
                    },
                    "children": [
                        {
                            "path": "download",
                            "component": "views/zip/index",
                            "name": "ExportZip",
                            "meta": {
                                "title": "Export Zip"
                            }
                        }
                    ]
                },
                {
                    "path": "/pdf",
                    "component": "layout/Layout",
                    "redirect": "/pdf/index",
                    "children": [
                        {
                            "path": "index",
                            "component": "views/pdf/index",
                            "name": "PDF",
                            "meta": {
                                "title": "PDF",
                                "icon": "pdf"
                            }
                        }
                    ]
                },
                {
                    "path": "/pdf/download",
                    "component": "views/pdf/download",
                    "hidden": true
                },
                {
                    "path": "/theme",
                    "component": "layout/Layout",
                    "redirect": "noRedirect",
                    "children": [
                        {
                            "path": "index",
                            "component": "views/theme/index",
                            "name": "Theme",
                            "meta": {
                                "title": "Theme",
                                "icon": "theme"
                            }
                        }
                    ]
                },
                {
                    "path": "/clipboard",
                    "component": "layout/Layout",
                    "redirect": "noRedirect",
                    "children": [
                        {
                            "path": "index",
                            "component": "views/clipboard/index",
                            "name": "ClipboardDemo",
                            "meta": {
                                "title": "Clipboard Demo",
                                "icon": "clipboard"
                            }
                        }
                    ]
                },
                {
                    "path": "/i18n",
                    "component": "layout/Layout",
                    "children": [
                        {
                            "path": "index",
                            "component": "views/i18n-demo/index",
                            "name": "I18n",
                            "meta": {
                                "title": "I18n",
                                "icon": "international"
                            }
                        }
                    ]
                },
                {
                    "path": "external-link",
                    "component": "layout/Layout",
                    "children": [
                        {
                            "path": "https://github.com/PanJiaChen/vue-element-admin",
                            "meta": {
                                "title": "External Link",
                                "icon": "link"
                            }
                        }
                    ]
                },
                {
                    "path": "*",
                    "redirect": "/404",
                    "hidden": true
                }
            ]
        },
        {
            key: "editor",
            name: "editor",
            description: "Normal Editor. Can see all pages except permission page",
            routes: [
                {
                    "path": "/redirect",
                    "component": "layout/Layout",
                    "hidden": true,
                    "children": [
                        {
                            "path": "/redirect/:path*",
                            "component": "views/redirect/index"
                        }
                    ]
                },
                {
                    "path": "/login",
                    "component": "views/login/index",
                    "hidden": true
                },
                {
                    "path": "/auth-redirect",
                    "component": "views/login/auth-redirect",
                    "hidden": true
                },
                {
                    "path": "/404",
                    "component": "views/error-page/404",
                    "hidden": true
                },
                {
                    "path": "/401",
                    "component": "views/error-page/401",
                    "hidden": true
                },
                {
                    "path": "",
                    "component": "layout/Layout",
                    "redirect": "dashboard",
                    "children": [
                        {
                            "path": "dashboard",
                            "component": "views/dashboard/index",
                            "name": "Dashboard",
                            "meta": {
                                "title": "Dashboard",
                                "icon": "dashboard",
                                "affix": true
                            }
                        }
                    ]
                },
                {
                    "path": "/documentation",
                    "component": "layout/Layout",
                    "children": [
                        {
                            "path": "index",
                            "component": "views/documentation/index",
                            "name": "Documentation",
                            "meta": {
                                "title": "Documentation",
                                "icon": "documentation",
                                "affix": true
                            }
                        }
                    ]
                },
                {
                    "path": "/guide",
                    "component": "layout/Layout",
                    "redirect": "/guide/index",
                    "children": [
                        {
                            "path": "index",
                            "component": "views/guide/index",
                            "name": "Guide",
                            "meta": {
                                "title": "Guide",
                                "icon": "guide",
                                "noCache": true
                            }
                        }
                    ]
                },
                {
                    "path": "/icon",
                    "component": "layout/Layout",
                    "children": [
                        {
                            "path": "index",
                            "component": "views/icons/index",
                            "name": "Icons",
                            "meta": {
                                "title": "Icons",
                                "icon": "icon",
                                "noCache": true
                            }
                        }
                    ]
                },
                {
                    "path": "/components",
                    "component": "layout/Layout",
                    "redirect": "noRedirect",
                    "name": "ComponentDemo",
                    "meta": {
                        "title": "Components",
                        "icon": "component"
                    },
                    "children": [
                        {
                            "path": "tinymce",
                            "component": "views/components-demo/tinymce",
                            "name": "TinymceDemo",
                            "meta": {
                                "title": "Tinymce"
                            }
                        },
                        {
                            "path": "markdown",
                            "component": "views/components-demo/markdown",
                            "name": "MarkdownDemo",
                            "meta": {
                                "title": "Markdown"
                            }
                        },
                        {
                            "path": "json-editor",
                            "component": "views/components-demo/json-editor",
                            "name": "JsonEditorDemo",
                            "meta": {
                                "title": "Json Editor"
                            }
                        },
                        {
                            "path": "split-pane",
                            "component": "views/components-demo/split-pane",
                            "name": "SplitpaneDemo",
                            "meta": {
                                "title": "SplitPane"
                            }
                        },
                        {
                            "path": "avatar-upload",
                            "component": "views/components-demo/avatar-upload",
                            "name": "AvatarUploadDemo",
                            "meta": {
                                "title": "Avatar Upload"
                            }
                        },
                        {
                            "path": "dropzone",
                            "component": "views/components-demo/dropzone",
                            "name": "DropzoneDemo",
                            "meta": {
                                "title": "Dropzone"
                            }
                        },
                        {
                            "path": "sticky",
                            "component": "views/components-demo/sticky",
                            "name": "StickyDemo",
                            "meta": {
                                "title": "Sticky"
                            }
                        },
                        {
                            "path": "count-to",
                            "component": "views/components-demo/count-to",
                            "name": "CountToDemo",
                            "meta": {
                                "title": "Count To"
                            }
                        },
                        {
                            "path": "mixin",
                            "component": "views/components-demo/mixin",
                            "name": "ComponentMixinDemo",
                            "meta": {
                                "title": "componentMixin"
                            }
                        },
                        {
                            "path": "back-to-top",
                            "component": "views/components-demo/back-to-top",
                            "name": "BackToTopDemo",
                            "meta": {
                                "title": "Back To Top"
                            }
                        },
                        {
                            "path": "drag-dialog",
                            "component": "views/components-demo/drag-dialog",
                            "name": "DragDialogDemo",
                            "meta": {
                                "title": "Drag Dialog"
                            }
                        },
                        {
                            "path": "drag-select",
                            "component": "views/components-demo/drag-select",
                            "name": "DragSelectDemo",
                            "meta": {
                                "title": "Drag Select"
                            }
                        },
                        {
                            "path": "dnd-list",
                            "component": "views/components-demo/dnd-list",
                            "name": "DndListDemo",
                            "meta": {
                                "title": "Dnd List"
                            }
                        },
                        {
                            "path": "drag-kanban",
                            "component": "views/components-demo/drag-kanban",
                            "name": "DragKanbanDemo",
                            "meta": {
                                "title": "Drag Kanban"
                            }
                        }
                    ]
                },
                {
                    "path": "/charts",
                    "component": "layout/Layout",
                    "redirect": "noRedirect",
                    "name": "Charts",
                    "meta": {
                        "title": "Charts",
                        "icon": "chart"
                    },
                    "children": [
                        {
                            "path": "keyboard",
                            "component": "views/charts/keyboard",
                            "name": "KeyboardChart",
                            "meta": {
                                "title": "Keyboard Chart",
                                "noCache": true
                            }
                        },
                        {
                            "path": "line",
                            "component": "views/charts/line",
                            "name": "LineChart",
                            "meta": {
                                "title": "Line Chart",
                                "noCache": true
                            }
                        },
                        {
                            "path": "mixchart",
                            "component": "views/charts/mixChart",
                            "name": "MixChart",
                            "meta": {
                                "title": "Mix Chart",
                                "noCache": true
                            }
                        }
                    ]
                },
                {
                    "path": "/nested",
                    "component": "layout/Layout",
                    "redirect": "/nested/menu1/menu1-1",
                    "name": "Nested",
                    "meta": {
                        "title": "Nested",
                        "icon": "nested"
                    },
                    "children": [
                        {
                            "path": "menu1",
                            "component": "views/nested/menu1/index",
                            "name": "Menu1",
                            "meta": {
                                "title": "Menu1"
                            },
                            "redirect": "/nested/menu1/menu1-1",
                            "children": [
                                {
                                    "path": "menu1-1",
                                    "component": "views/nested/menu1/menu1-1",
                                    "name": "Menu1-1",
                                    "meta": {
                                        "title": "Menu1-1"
                                    }
                                },
                                {
                                    "path": "menu1-2",
                                    "component": "views/nested/menu1/menu1-2",
                                    "name": "Menu1-2",
                                    "redirect": "/nested/menu1/menu1-2/menu1-2-1",
                                    "meta": {
                                        "title": "Menu1-2"
                                    },
                                    "children": [
                                        {
                                            "path": "menu1-2-1",
                                            "component": "views/nested/menu1/menu1-2/menu1-2-1",
                                            "name": "Menu1-2-1",
                                            "meta": {
                                                "title": "Menu1-2-1"
                                            }
                                        },
                                        {
                                            "path": "menu1-2-2",
                                            "component": "views/nested/menu1/menu1-2/menu1-2-2",
                                            "name": "Menu1-2-2",
                                            "meta": {
                                                "title": "Menu1-2-2"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "path": "menu1-3",
                                    "component": "views/nested/menu1/menu1-3",
                                    "name": "Menu1-3",
                                    "meta": {
                                        "title": "Menu1-3"
                                    }
                                }
                            ]
                        },
                        {
                            "path": "menu2",
                            "name": "Menu2",
                            "component": "views/nested/menu2/index",
                            "meta": {
                                "title": "Menu2"
                            }
                        }
                    ]
                },
                {
                    "path": "/example",
                    "component": "layout/Layout",
                    "redirect": "/example/list",
                    "name": "Example",
                    "meta": {
                        "title": "Example",
                        "icon": "example"
                    },
                    "children": [
                        {
                            "path": "create",
                            "component": "views/example/create",
                            "name": "CreateArticle",
                            "meta": {
                                "title": "Create Article",
                                "icon": "edit"
                            }
                        },
                        {
                            "path": "edit/:id(\\d+)",
                            "component": "views/example/edit",
                            "name": "EditArticle",
                            "meta": {
                                "title": "Edit Article",
                                "noCache": true
                            },
                            "hidden": true
                        },
                        {
                            "path": "list",
                            "component": "views/example/list",
                            "name": "ArticleList",
                            "meta": {
                                "title": "Article List",
                                "icon": "list"
                            }
                        }
                    ]
                },
                {
                    "path": "/tab",
                    "component": "layout/Layout",
                    "children": [
                        {
                            "path": "index",
                            "component": "views/tab/index",
                            "name": "Tab",
                            "meta": {
                                "title": "Tab",
                                "icon": "tab"
                            }
                        }
                    ]
                },
                {
                    "path": "/error",
                    "component": "layout/Layout",
                    "redirect": "noRedirect",
                    "name": "ErrorPages",
                    "meta": {
                        "title": "Error Pages",
                        "icon": "404"
                    },
                    "children": [
                        {
                            "path": "401",
                            "component": "views/error-page/401",
                            "name": "Page401",
                            "meta": {
                                "title": "Page 401",
                                "noCache": true
                            }
                        },
                        {
                            "path": "404",
                            "component": "views/error-page/404",
                            "name": "Page404",
                            "meta": {
                                "title": "Page 404",
                                "noCache": true
                            }
                        }
                    ]
                },
                {
                    "path": "/error-log",
                    "component": "layout/Layout",
                    "redirect": "noRedirect",
                    "children": [
                        {
                            "path": "log",
                            "component": "views/error-log/index",
                            "name": "ErrorLog",
                            "meta": {
                                "title": "Error Log",
                                "icon": "bug"
                            }
                        }
                    ]
                },
                {
                    "path": "/excel",
                    "component": "layout/Layout",
                    "redirect": "/excel/export-excel",
                    "name": "Excel",
                    "meta": {
                        "title": "Excel",
                        "icon": "excel"
                    },
                    "children": [
                        {
                            "path": "export-excel",
                            "component": "views/excel/export-excel",
                            "name": "ExportExcel",
                            "meta": {
                                "title": "Export Excel"
                            }
                        },
                        {
                            "path": "export-selected-excel",
                            "component": "views/excel/select-excel",
                            "name": "SelectExcel",
                            "meta": {
                                "title": "Select Excel"
                            }
                        },
                        {
                            "path": "export-merge-header",
                            "component": "views/excel/merge-header",
                            "name": "MergeHeader",
                            "meta": {
                                "title": "Merge Header"
                            }
                        },
                        {
                            "path": "upload-excel",
                            "component": "views/excel/upload-excel",
                            "name": "UploadExcel",
                            "meta": {
                                "title": "Upload Excel"
                            }
                        }
                    ]
                },
                {
                    "path": "/zip",
                    "component": "layout/Layout",
                    "redirect": "/zip/download",
                    "alwaysShow": true,
                    "meta": {
                        "title": "Zip",
                        "icon": "zip"
                    },
                    "children": [
                        {
                            "path": "download",
                            "component": "views/zip/index",
                            "name": "ExportZip",
                            "meta": {
                                "title": "Export Zip"
                            }
                        }
                    ]
                },
                {
                    "path": "/pdf",
                    "component": "layout/Layout",
                    "redirect": "/pdf/index",
                    "children": [
                        {
                            "path": "index",
                            "component": "views/pdf/index",
                            "name": "PDF",
                            "meta": {
                                "title": "PDF",
                                "icon": "pdf"
                            }
                        }
                    ]
                },
                {
                    "path": "/pdf/download",
                    "component": "views/pdf/download",
                    "hidden": true
                },
                {
                    "path": "/theme",
                    "component": "layout/Layout",
                    "redirect": "noRedirect",
                    "children": [
                        {
                            "path": "index",
                            "component": "views/theme/index",
                            "name": "Theme",
                            "meta": {
                                "title": "Theme",
                                "icon": "theme"
                            }
                        }
                    ]
                },
                {
                    "path": "/clipboard",
                    "component": "layout/Layout",
                    "redirect": "noRedirect",
                    "children": [
                        {
                            "path": "index",
                            "component": "views/clipboard/index",
                            "name": "ClipboardDemo",
                            "meta": {
                                "title": "Clipboard Demo",
                                "icon": "clipboard"
                            }
                        }
                    ]
                },
                {
                    "path": "/i18n",
                    "component": "layout/Layout",
                    "children": [
                        {
                            "path": "index",
                            "component": "views/i18n-demo/index",
                            "name": "I18n",
                            "meta": {
                                "title": "I18n",
                                "icon": "international"
                            }
                        }
                    ]
                },
                {
                    "path": "external-link",
                    "component": "layout/Layout",
                    "children": [
                        {
                            "path": "https://github.com/PanJiaChen/vue-element-admin",
                            "meta": {
                                "title": "External Link",
                                "icon": "link"
                            }
                        }
                    ]
                },
                {
                    "path": "*",
                    "redirect": "/404",
                    "hidden": true
                }
            ]
        },
        {
            key: "visitor",
            name: "visitor",
            description: "Just a visitor. Can only see the home page and the document page",
            routes: [
                {
                    path: "",
                    redirect: "dashboard",
                    children: [
                        {
                            path: "dashboard",
                            name: "Dashboard",
                            meta: {
                                title: "dashboard",
                                icon: "dashboard"
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
      ],
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: "new",
      checkStrictly: false,
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    routesData() {
      return this.routes;
    },
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes();
    this.getRoles();
  },
  methods: {
    async getRoutes() {
      // const res = await getRoutes();
      this.serviceRoutes = this.res.data;
      this.routes = this.generateRoutes(this.res.data);
      console.log(this.serviceRoutes)
    },
    async getRoles() {
      // const res = await getRoles();
      this.rolesList = this.res.data;
      console.log(this.rolesList)
    },

    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = "/") {
      const res = [];

      for (let route of routes) {
        // skip some route
        if (route.hidden) {
          continue;
        }

        const onlyOneShowingChild = this.onlyOneShowingChild(
          route.children,
          route
        );

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild;
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title,
        };

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path);
        }
        res.push(data);
      }
      return this.res;
      console.log(this.res);
    },
    generateArr(routes) {
      let data = [];
      routes.forEach((route) => {
        data.push(route);
        if (route.children) {
          const temp = this.generateArr(route.children);
          if (temp.length > 0) {
            data = [...data, ...temp];
          }
        }
      });
      return data;
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole);
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([]);
      }
      this.dialogType = "new";
      this.dialogVisible = true;
    },
    handleEdit(scope) {
      this.dialogType = "edit";
      this.dialogVisible = true;
      this.checkStrictly = true;
      this.role = deepClone(scope.row);
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.routes);
        this.$refs.tree.setCheckedNodes(this.generateArr(routes));
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false;
      });
    },
    handleDelete({ $index, row }) {
      this.$confirm("Confirm to remove the role?", "Warning", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          await deleteRole(row.key);
          this.rolesList.splice($index, 1);
          this.$message({
            type: "success",
            message: "Delete succed!",
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    generateTree(routes, basePath = "/", checkedKeys) {
      const res = [];

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path);

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(
            route.children,
            routePath,
            checkedKeys
          );
        }

        if (
          checkedKeys.includes(routePath) ||
          (route.children && route.children.length >= 1)
        ) {
          res.push(route);
        }
      }
      return res;
    },
    async confirmRole() {
      const isEdit = this.dialogType === "edit";

      const checkedKeys = this.$refs.tree.getCheckedKeys();
      this.role.routes = this.generateTree(
        deepClone(this.serviceRoutes),
        "/",
        checkedKeys
      );

      if (isEdit) {
        await updateRole(this.role.key, this.role);
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].key === this.role.key) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role));
            break;
          }
        }
      } else {
        const { data } = await addRole(this.role);
        this.role.key = data.key;
        this.rolesList.push(this.role);
      }

      const { description, key, name } = this.role;
      this.dialogVisible = false;
      this.$notify({
        title: "Success",
        dangerouslyUseHTMLString: true,
        message: `
            <div>Role Key: ${key}</div>
            <div>Role Name: ${name}</div>
            <div>Description: ${description}</div>
          `,
        type: "success",
      });
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null;
      const showingChildren = children.filter((item) => !item.hidden);

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0];
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path);
        return onlyOneChild;
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return onlyOneChild;
      }

      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
