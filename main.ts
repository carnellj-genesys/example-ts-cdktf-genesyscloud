// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";

import {GenesyscloudProvider} from "./.gen/providers/genesyscloud/provider";
import { RoutingQueue } from "./.gen/providers/genesyscloud/routing-queue";
import { TfExport} from "./.gen/providers/genesyscloud/tf-export";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // define resources here
    new GenesyscloudProvider(this,"genesyscloudprovider", {})

    new TfExport(this, "myexport", {
      directory: "./genesyscloud/export",
      resourceTypes: ["genesyscloud_routing_queue"],
      includeStateFile: true,
      exportAsHcl: true
    })

    new RoutingQueue(this, "mySimpleCDKQueue",{
      name: "MySimpleCDKQueue", 
      description: "Example Queue built by CDK"
    }) 
  }
}



const app = new App();

new MyStack(app, "cdktf");
app.synth();
