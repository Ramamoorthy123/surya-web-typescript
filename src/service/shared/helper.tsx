import { startCase } from "lodash";
import { DownOutlined, PercentageOutlined } from '@ant-design/icons'; 
import { Select } from "antd";
import React from "react";
import { FixedType } from 'rc-table/lib/interface';


const { Option } = Select;



const getWidth = (item: string) => {
    if(item === 'part_description') {
        return "25%"
    } else if(item === 'part_name' || item === 'project_quantity') {
        return '10%'
    } else {
        return '7%'
    }
}

const getWidthBom = (item: string) => {
  if(item === 'part_description') {
      return "35%"
  } else if(item === 'part_name' || item === 'project_quantity') {
      return '10%'
  } else {
      return '7%'
  }
}

export const constructTableColumns = (columns: any[], partNameFilterOptions?: any[]) => {
    return columns
      .filter((column) => !column.hidden) 
      .map((column) => {
        const children = column.children?.map((child: any, index: number) => {
          if(column?.value === 'distributed') {
              if (typeof child === 'string') {
                  return {
                    title: child === 'percentage' ? <PercentageOutlined /> : startCase(child), 
                    dataIndex: child, 
                    key: `${column.key}-${index}`, 
                    align: 'center',
                    render: (_: any, record: any) => {
                        if(child === 'percentage') {
                          return <div style={{background: record?.['distribution_progress'] ? 'rgb(252, 142, 172)' : ''}}>
                            {(record?.['distribution_progress'])?.toFixed(2)}
                          </div>
                        } else {
                          return <div style={{background: record?.['distributed_quantity'] ? 'rgb(252, 142, 172)' : ''}}>
                            {record?.['distributed_quantity']}
                          </div>
                        }
                    }
                  };
              }         
          } else if(column?.value === 'installed') {
              if (typeof child === 'string') {
                  return {
                    title: child === 'percentage' ? <PercentageOutlined /> : startCase(child), 
                    dataIndex: child, 
                    key: `${column.key}-${index}`, 
                    align: 'center',
                    render: (_: any, record: any) => {
                      if(child === 'percentage') {
                        return <div style={{background: record?.['installed_progress'] ? 'rgb(252, 142, 172)' : ''}}>
                          {(record?.['installed_progress'])?.toFixed(2)}
                        </div>
                      } else {
                        return <div style={{background: record?.['installed_quantity'] ? 'rgb(252, 142, 172)' : ''}}>
                          {record?.['installed_quantity']}
                        </div>
                      }
                   }
                  };
              }         
          }
          return child
        }).filter(Boolean); 
  
        return {
          title: startCase(column.value), 
          key: column.key, 
          dataIndex: column.value, 
          width: getWidth(column.value), 
          children: children || [], 
          filters: column.value === 'part_name' ? partNameFilterOptions?.map((name: string) => ({ text: name, value: name })) : undefined,
          onFilter: (value: any, record: any) => record.part_name.indexOf(value as string) === 0,
          render: (_: any, record: any) => {
            if (column.value === 'part_description') {
              return <div>{record['description']}</div>;
            } else if (column.value === 'project_quantity') {
              return <div>{record['default_project_quantity']}</div>;
            } else if (column.value === 'construction_spares') {
              return <div>{record['spare_count']}</div>;
            } else if (column.value === 'addl_qty_incl_o&m_spares') {
              return <div>{record['additional_count']}</div>;
            } else if (column.value === 'total_quantity') {
              return <div>{record['project_quantity']}</div>;
            } else if (column.value === 'on-site_qty') {
              return (
                <div>
                  {record['received_quantity'] ? (
                    <div className="cursor-pointer font-[600] text-[#f16253] underline">
                      {record['received_quantity']}
                    </div>
                  ) : (
                    <div className="cursor-pointer font-[600] text-[#f16253]">{"-"}</div>
                  )}
                </div>
              );
            } else if (column.value === 'balance_qty') {
              return <div>{record['project_quantity'] - record['received_quantity']}</div>;
            } else if (column.value === 'part_name') {
              return <div className="font-[600]">{record['part_name']}</div>;
            } else {
              return <div>{record[column.value]}</div>; 
            }
          },
        };
      });
  };


  
export const constructBomTable = (
  columns: any[], 
  partNameFilterOptions?: any[], 
  isEdit?: boolean, 
  list?: any[],
  handleChange?: any
) => {
  return columns
    .filter((column) => !column.hidden) 
    .map((column) => {
      const children = column.children?.map((child: any, index: number) => {
        if(column?.value === 'distributed') {
            if (typeof child === 'string') {
                return {
                  title: child === 'percentage' ? <PercentageOutlined /> : startCase(child), 
                  dataIndex: child, 
                  key: `${column.key}-${index}`, 
                  align: 'center',
                  render: (_: any, record: any) => {
                        return (
                          <div>
                            {isEdit ?
                              <div className="bom-details px-4">
                                <Select
                                    value={record?.distribution ? record?.distribution : 'none' }
                                    style={{ width: "100%" }}
                                    onChange={(value) =>handleChange(value, record, "distribution")}
                                    className='activity-select'
                                >
                                    <Option  style={{ fontWeight: 500 }} value="none">None Selected</Option>
                                    <Option  style={{ fontWeight: 500 }} value="all">OverAll</Option>
                                    {list?.map((group: any, index: number) => (
                                        <React.Fragment key={`group-${index}-${group?.id}`}>
                                            <Option 
                                            style={{ fontWeight: 500 }} 
                                            value={`parent-${group.id}`} 
                                            key={`parent-${group.value}-${index}-${group?.id}`}
                                            >
                                                {startCase(group.label)}
                                            </Option>

                                            {group.children?.map((child: any, childIndex: any) => (
                                                <Option 
                                                    value={child.id} 
                                                    key={`child-${child.value}-${childIndex}-${child?.id}`}
                                                    style={{ paddingLeft: '24px' }}
                                                >
                                                {startCase(child.label)}
                                                </Option>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </Select>
                              </div>
                            : <div className="flex  items-center justify-between px-8">
                                <div>{record?.['distribution_name']}</div>
                                <div>{record?.['distribution_name'] ? <DownOutlined style={{ fontSize: '14px' , color:"#bfbfbf"}} /> : ''}</div>
                              </div>
                            }
                          </div>
                        )
                  }
                };
            }         
        } else if(column?.value === 'installed') {
            if (typeof child === 'string') {
                return {
                  title: child === 'percentage' ? <PercentageOutlined /> : startCase(child), 
                  dataIndex: child, 
                  key: `${column.key}-${index}`, 
                  align: 'center',
                  render: (_: any, record: any) => {
                      return (
                        <div>
                        {isEdit ?
                          <div className="bom-details px-4">
                            <Select
                                value={record?.installed ? record?.installed : "none"}
                                style={{ width: "100%" }}
                                onChange={(value) =>handleChange(value, record, "installed")}
                                className='activity-select'
                            >
                                <Option  style={{ fontWeight: 500 }} value="none">None Selected</Option>
                                <Option  style={{ fontWeight: 500 }} value="all">OverAll</Option>
                                {list?.map((group: any, index: number) => (
                                    <React.Fragment key={`group-${index}-${group?.id}`}>
                                        <Option 
                                        style={{ fontWeight: 500 }} 
                                        value={`parent-${group.id}`} 
                                        key={`parent-${group.value}-${index}-${group?.id}`}
                                        >
                                            {startCase(group.label)}
                                        </Option>

                                        {group.children?.map((child: any, childIndex: any) => (
                                            <Option 
                                                value={child.id} 
                                                key={`child-${child.value}-${childIndex}-${child?.id}`}
                                                style={{ paddingLeft: '24px' }}
                                            >
                                            {startCase(child.label)}
                                            </Option>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </Select>
                          </div>
                        : <div className="flex items-center justify-between px-8">
                            <div>{record?.['installed_name']}</div>
                            <div>{record?.['installed_name'] ? <DownOutlined style={{ fontSize: '14px' , color:"#bfbfbf"}} /> : ''}</div>
                          </div>
                        }
                      </div>
                      )
                 }
                };
            }         
        }
        return child
      }).filter(Boolean); 

      return {
        title: startCase(column.value), 
        key: column.key, 
        dataIndex: column.value, 
        width: getWidthBom(column.value), 
        children: children || [], 
        filters: column.value === 'part_name' ? partNameFilterOptions?.map((name: string) => ({ text: name, value: name })) : undefined,
        onFilter: (value: any, record: any) => record.part_name.indexOf(value as string) === 0,
        render: (_: any, record: any) => {
          if (column.value === 'part_description') {
            return <div>{record['description']}</div>;
          } else if (column.value === 'project_quantity') {
            return <div>{record['default_project_quantity']}</div>;
          } else if (column.value === 'balance_qty') {
            return <div>{record['project_quantity'] - record['received_quantity']}</div>;
          } else if (column.value === 'part_name') {
            return <div className="font-[600]">{record['part_name']}</div>;
          } else {
            return <div>{record[column.value]}</div>; 
          }
        },
      };
    });
};

const getSummaryWidth = (item: string) => {
    if(item === "blocks") {
      return "200px"
    } else {
      return "300px"
    }
}


export const constructSummaryTableColumns = (columns: any[]) => {
  return columns
    .filter((column) => !column.hidden) 
    .map((column) => {
      const children = column.children?.map((child: any, index: number) => {
        if (typeof child === 'string') {
          return {
            title: child === "progress" ? `${startCase(child)} (%)` : startCase(child), 
            dataIndex: child,
            key: `${column.key}-${index}`, 
            align: 'center',
            width: "150px",
            onHeaderCell: () => ({
              className: column?.parent && ["piling","blocks", "tracker_install", "module_install"].includes(column.value)
                ? 'custom-header-red'
                : 'custom-header-default',
            }),
            render: (_: any, record: any) => {
              if (child === 'counts') {
                return (
                  <div >
                    {Math.round(record?.[column?.value]?.["deployed_count"])} of {Math.round(record?.[column?.value]?.["total_count"])}
                  </div>
                );
              } else {
                return (
                  <div>
                    {Math.round(record?.[column?.value]?.[child])} %
                  </div>
                );
              }
            },
          };
        }
        return child; 
      }).filter(Boolean); 

      const fixed: FixedType | undefined = column.value === "blocks" ? 'left' : undefined;

      return {
        title: startCase(column.value), 
        key: column.key,
        dataIndex: column.value,
        width: getSummaryWidth(column.value),
        fixed, 
        children: children || [], 
        onHeaderCell: () => ({
          className: column?.parent && ["piling","blocks", "tracker_install", "module_install"].includes(column.value)
            ? 'custom-header-red'
            : 'custom-header-default',
        }),
        render: (_: any, record: any) => {
          if (column.value === 'blocks') {
            return <div>{record['block_name']}</div>;
          } else {
            return <div>{record[column.value]}</div>; 
          }
        },
      };
    });
};

  



