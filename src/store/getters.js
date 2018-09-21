const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  // avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  personinfo: state => state.personinfo,
  subject: state => state.subject,
  platform: state => state.platform,
  pageform: state => state.pageform,
  menulist: state => state.menulist,
  gourplist: state => state.gourplist,
  pagelist: state => state.pagelist,
  pagestructure: state => state.pagestructure,
  menu1: state => state.menu1
}
export default getters
