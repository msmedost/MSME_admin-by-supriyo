import { NavLink } from "react-router-dom";
import '../styles/sidebar.css'
function Sidebar(){
    return(
        <>
        <div className="sidebar">
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      {/* Sidebar - Brand */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
       
        <div className="sidebar-brand-text mx-3">MSME-DOST</div>
      </a>
      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      {/* Nav Item - Dashboard */}
      <li className="nav-item">
        <NavLink className="nav-link" to="/admin">
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Dashboard</span></NavLink>
      </li>
     
      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i className="fas fa-fw fa-cog" />
          <span>Manage </span>
        </a>
        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
          
            <NavLink className="collapse-item" to="/approve">Requests</NavLink>
            
          </div>
        </div>
        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
          
            <NavLink className="collapse-item" to="/cat_manage"> Manage Categories</NavLink>
            
          </div>
        </div>
        
       
        
       
        
        {/* <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
          
            <NavLink className="collapse-item" to="/product-details">Billing Details</NavLink>
            
          </div>
        </div> */}
      </li>
      
      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />
      {/* Sidebar Toggler (Sidebar) */}
      {/* <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" />
      </div> */}
    </ul>
    </div>
        </>
    )
}

export default Sidebar;